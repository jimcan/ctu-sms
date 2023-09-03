import type { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import admin from 'firebase-admin';
import {
	FIREBASE_PROJECT_ID,
	FIREBASE_CLIENT_EMAIL,
	FIREBASE_PRIVATE_KEY
} from '$env/static/private';
import { cert } from 'firebase-admin/app';
import { handleError } from '../utils';

function initFirebaseAdmin() {
	if (!admin.apps.length) {
		const projectId = FIREBASE_PROJECT_ID;
		const clientEmail = FIREBASE_CLIENT_EMAIL;
		const privateKey = FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n');

		admin.initializeApp({
			credential: cert({ clientEmail, privateKey, projectId }),
			databaseURL: `https://${projectId}.firebaseio.com`,
			storageBucket: `gs://${projectId}.appspot.com`
		});
	}

	return { db: admin.firestore(), auth: admin.auth(), storage: admin.storage() };
}

export async function decodeToken(token: string): Promise<{
	decodedToken?: DecodedIdToken;
	error?: AppError;
}> {
	if (!token || token === 'null' || token === 'undefined') return {};
	try {
		const { auth } = initFirebaseAdmin();
		return { decodedToken: await auth.verifyIdToken(token) };
	} catch (err: any) {
		return { error: handleError(err) };
	}
}

export async function saveAsAdmin<T extends AnyObject>(
	collection: string,
	uid: string,
	data: T
): Promise<AppError | undefined> {
	try {
		const { db } = initFirebaseAdmin();
		const colRef = db.collection(collection);
		await colRef.doc(uid).set(data, { merge: true });
	} catch (e) {
		return handleError(e);
	}
}

export async function exists(collection: string, uid: string): Promise<boolean | AppError> {
	const { db } = initFirebaseAdmin();
	const colRef = db.collection(collection);
	try {
		return (await colRef.doc(uid).get()).exists;
	} catch (e) {
		return handleError(e);
	}
}

export async function studentsBySection(
	section?: string | null
): Promise<{ docs?: Student[]; error?: AppError }> {
	try {
		const { db } = initFirebaseAdmin();

		const query = section
			? db.collection('students').where('sectionCode', '==', section)
			: db.collection('students');

		const snapshot = await query.get();

		const docs: Student[] = snapshot.docs.map((d) => ({ uid: d.id, ...d.data() } as Student));
		return { docs };
	} catch (e) {
		return { error: handleError(e) };
	}
}

export const studentsCollection = () => {
	const { db } = initFirebaseAdmin();
	return db.collection('students');
};

export const studentsSnapshots = () => {
	const { db } = initFirebaseAdmin();
	let students: Student[] = [];
	db.collection('students').onSnapshot((s) => {
		students = s.docs.map((d) => ({ ...d.data(), uid: d.id } as Student));
	});

	return students;
};

export const hasChanges = () => {
	const { db } = initFirebaseAdmin();
	let students: Student[] = [];
	db.collection('students').onSnapshot((s) => {
		return !!s.docChanges().length;
	});
};

export async function getDocsAsAdmin<T>(
	collection: string
): Promise<{ docs?: T[]; error?: AppError }> {
	try {
		const { db } = initFirebaseAdmin();

		const colRef = db.collection(collection);
		const snapshot = await colRef.get();
		const docs: T[] = snapshot.docs.map((d) => ({ uid: d.id, ...d.data() } as T));
		return { docs };
	} catch (e) {
		return { error: handleError(e) };
	}
}

export async function getDocAsAdmin<T>(
	collection: string,
	uid: string
): Promise<{ doc?: T; error?: AppError }> {
	try {
		const { db } = initFirebaseAdmin();
		const docRef = db.collection(collection).doc(uid);
		const snapshot = await docRef.get();
		const doc: T = snapshot.data() as T;
		return { doc };
	} catch (e) {
		return { error: handleError(e) };
	}
}
