import {
	deleteDoc,
	QueryDocumentSnapshot,
	QuerySnapshot,
	collection,
	doc,
	getDocs,
	limit,
	onSnapshot,
	query,
	updateDoc,
	where,
	setDoc,
	addDoc,
	getDoc
} from 'firebase/firestore';
import { db } from './config';
import { handleError } from '$lib/services/utils';
import { readable, writable } from 'svelte/store';
import { browser } from '$app/environment';

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

// export function getDocsStore<T extends object>(col: string) {
// 	return readable<T[]>([], (set) => {
// 		let dbUnsub: () => void;
// 		let unsubbed = false;

// 		if (browser) {
// 			if (unsubbed) return;

// 			dbUnsub = onSnapshot(collection(db, col), (snapshot) => {
// 				if (snapshot.empty) {
// 					dbUnsub();
// 				} else console.log(snapshot.docs.map((d) => d.data()));

// 				return set(
// 					snapshot.docs.map((d) => {
// 						return { uid: d.id, ...d.data() } as T;
// 					})
// 				);
// 			});
// 		}

// 		return () => {
// 			unsubbed = true;
// 			if (dbUnsub) dbUnsub();
// 		};
// 	});
// }

// export function getDocumentsStore<T extends AnyObject>(col: string) {
// 	let filteredBy: AnyObject | undefined;

// 	const data = writable<{ all: T[]; filtered: T[] }>({ all: [], filtered: [] }, (set) => {
// 		let dbUnsub: () => void;
// 		let unsubbed = false;

// 		if (browser) {
// 			if (unsubbed) return;

// 			dbUnsub = onSnapshot(collection(db, col), (snapshot) => {
// 				if (snapshot.empty) {
// 					dbUnsub();
// 				}

// 				return set(setInit(snapshot));
// 			});
// 		}

// 		return () => {
// 			unsubbed = true;
// 			if (dbUnsub) dbUnsub();
// 		};
// 	});

// 	const setInit = (snapshot: QuerySnapshot) => {
// 		const docs = snapshot.docs.map((d) => ({ ...d.data(), uid: d.id } as unknown as T));
// 		return {
// 			all: docs,
// 			filtered: filteredBy
// 				? docs.filter((d) => {
// 						const { field, value } = parseFilter(filteredBy ?? []);
// 						return d[field] === value;
// 				  })
// 				: []
// 		};
// 	};

// 	// async function init(filterBy?: AnyObject) {
// 	// 	filteredBy = filterBy;
// 	// 	const colRef = collection(db, col);
// 	// 	const snapshot = await getDocs(colRef);
// 	// 	data.set(setInit(snapshot));
// 	// }

// 	const filter = async (by: AnyObject) => {
// 		filteredBy = by;

// 		const { field, value } = parseFilter(by);

// 		data.update((old) => {
// 			const filtered = old.all.filter((v) => {
// 				return v[field] === value;
// 			});
// 			console.log(old.all);

// 			console.log(filtered);

// 			return { ...old, filtered };
// 		});
// 	};

// 	const parseFilter = (by: AnyObject) => {
// 		const field = Object.keys(by)[0];
// 		const value = by[field];
// 		return { field, value };
// 	};

// 	return {
// 		data,
// 		filter
// 		// init
// 	};
// }

// export function getStudentsStore(section: string) {
// 	return readable<Student[]>([], (set) => {
// 		let dbUnsub: () => void;
// 		let unsubbed = false;

// 		if (browser) {
// 			if (unsubbed) return;

// 			const q = query(
// 				collection(db, 'students')
// 				// where('sectionCode', '==', section)
// 			);

// 			dbUnsub = onSnapshot(q, (snapshot) => {
// 				if (snapshot.empty) {
// 					dbUnsub();
// 				} else console.log(snapshot.docs.map((d) => d.data()));

// 				return set(
// 					snapshot.docs.map((d) => {
// 						return { uid: d.id, ...d.data() } as Student;
// 					})
// 				);
// 			});
// 		}

// 		return () => {
// 			unsubbed = true;
// 			if (dbUnsub) dbUnsub();
// 		};
// 	});
// }

// export async function getStudentsBySection(section: string, queryLimit = 100) {
// 	const q = query(
// 		collection(db, 'students'),
// 		where('sectionCode', '==', section),
// 		limit(queryLimit)
// 	);
// }

// export async function studentsBySection(section?: string) {
// 	const colRef = collection(db, 'students');
// 	const q = section ? query(colRef, where('sectionCode', '==', section)) : colRef;
// 	const s = await getDocs(q);
// 	const is = s.docs.map((d) => ({ ...d.data(), uid: d.id } as Student));
// 	return readable<Student[]>(is, (set) => {
// 		onSnapshot(q, (snapshot) => {
// 			set(snapshot.docs.map((d) => ({ ...d.data(), uid: d.id } as Student)));
// 		});
// 	});
// }

// export type PaginatedDocs = {
// 	itemsPerPage: number;
// 	orderBy: string;
// 	prev: () => void;
// 	next: () => void;
// };

// export function getPaginatedSections<T extends Object>({ itemsPerPage, orderBy }: PaginatedDocs) {
// 	let hasMoreData = true;
// 	let lastVisible: QueryDocumentSnapshot | null = null;

// 	const data = writable<T[]>();

// 	const fetchData = async () => {};
// }

export async function deleteDocument(col: string, uid: string) {
	const docRef = doc(db, col, uid);
	await deleteDoc(docRef);
}

export async function saveDocument<T extends AnyObject>(col: string, data: T) {
	const colRef = collection(db, col);

	if (data.uid) {
		const uid = data.uid;
		delete data.uid;
		await setDoc(doc(colRef, uid), data);
	} else {
		await addDoc(colRef, data);
	}
}

export async function getDocument<T extends AnyObject>(col: string, uid: string): Promise<T> {
	const docRef = doc(db, col, uid);
	const d = await getDoc(docRef);
	return { ...d.data(), uid: d.id } as unknown as T;
}
