import {
	deleteDoc,
	collection,
	doc,
	getDocs,
	query,
	updateDoc,
	where,
	setDoc,
	addDoc,
	getDoc
} from 'firebase/firestore';
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

// export async function getDocument<T extends AnyObject>(col: string, uid: string): Promise<T> {
// 	const docRef = doc(db, col, uid);
// 	const d = await getDoc(docRef);
// 	return { ...d.data(), uid: d.id } as unknown as T;
// }

// export async function getDocuments<T extends AnyObject>(col: string): Promise<T[]> {
// 	const d = await getDocs(collection(db, col));
// 	return d.docs.map((d) => ({ ...d.data(), uid: d.id } as unknown as T));
// }

// export async function getAttendance(uid: string) {
// 	const q = query(collection(db, 'attendance'), where('owner', '==', uid));
// 	const snapshots = await getDocs(q);

// 	return snapshots.docs.map((a) => ({ ...a.data(), uid: a.id } as Attendance));
// }

// export async function getScores(uid: string) {
// 	const q = query(collection(db, 'scores'), where('owner', '==', uid));
// 	const snapshots = await getDocs(q);

// 	return snapshots.docs.map((a) => ({ ...a.data(), uid: a.id } as Score));
// }
