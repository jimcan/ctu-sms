import { deleteDoc, collection, doc, updateDoc, setDoc, addDoc } from 'firebase/firestore';
import { db } from './config';
import { handleError } from '$lib/services/utils';

export async function updateDocument<T>(
	col: string,
	uid: string,
	data: Partial<T>
): Promise<AppError | undefined> {
	try {
		await updateDoc(doc(db, col, uid), data);
	} catch (e) {
		return handleError(e);
	}
}
export async function deleteDocument(col: string, uid: string) {
	const docRef = doc(db, col, uid);
	await deleteDoc(docRef);
}

export async function saveDocument<T extends AnyObject>(col: string, data: T) {
	try {
		const colRef = collection(db, col);

		if (data.uid) {
			const uid = data.uid;
			delete data.uid;
			await setDoc(doc(colRef, uid), data);
		} else {
			await addDoc(colRef, data);
		}
	} catch (e) {
		return handleError(e);
	}
}
