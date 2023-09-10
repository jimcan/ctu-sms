import { browser } from '$app/environment';
import { db } from '$lib/services/client';
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { readable } from 'svelte/store';

export const students = readable<Student[]>([], (set) => {
	let dbUnsub: () => void;
	let unsubbed = false;

	if (browser) {
		if (unsubbed) return;

		dbUnsub = onSnapshot(query(collection(db, 'students'), orderBy('lastname')), (snapshot) => {
			if (snapshot.empty) {
				dbUnsub();
			}

			return set(
				snapshot.docs.map((d) => {
					return { uid: d.id, ...d.data() } as Student;
				})
			);
		});
	}

	return () => {
		unsubbed = true;
		if (dbUnsub) dbUnsub();
	};
});

export function getStudentStore(uid: string) {
	return readable<Student | null>(null, (set) => {
		let dbUnsub: () => void;
		let unsubbed = false;

		if (browser) {
			if (unsubbed) return;

			dbUnsub = onSnapshot(doc(db, 'students', uid), (snapshot) => {
				if (!snapshot.exists()) {
					dbUnsub();
				}

				return set({ uid: snapshot.id, ...snapshot.data() } as Student);
			});
		}

		return () => {
			unsubbed = true;
			if (dbUnsub) dbUnsub();
		};
	});
}
