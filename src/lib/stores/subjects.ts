import { browser } from '$app/environment';
import { db } from '$lib/services/client';
import { collection, onSnapshot } from 'firebase/firestore';
import { readable, writable } from 'svelte/store';

export const selectedSubject = writable<string | undefined>();

export const subjects = readable<Subject[]>([], (set) => {
	let dbUnsub: () => void;
	let unsubbed = false;

	if (browser) {
		if (unsubbed) return;

		dbUnsub = onSnapshot(collection(db, 'subjects'), (snapshot) => {
			if (snapshot.empty) {
				dbUnsub();
			}

			return set(
				snapshot.docs.map((d) => {
					return { uid: d.id, ...d.data() } as Subject;
				})
			);
		});
	}

	return () => {
		unsubbed = true;
		if (dbUnsub) dbUnsub();
	};
});
