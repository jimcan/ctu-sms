import { browser } from '$app/environment';
import { db } from '$lib/services/client';
import { collection, onSnapshot } from 'firebase/firestore';
import { readable } from 'svelte/store';

export const students = readable<Student[]>([], (set) => {
	let dbUnsub: () => void;
	let unsubbed = false;

	if (browser) {
		if (unsubbed) return;

		dbUnsub = onSnapshot(collection(db, 'students'), (snapshot) => {
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
