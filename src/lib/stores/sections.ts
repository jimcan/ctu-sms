import { browser } from '$app/environment';
import { db } from '$lib/services/client';
import { collection, onSnapshot } from 'firebase/firestore';
import { readable } from 'svelte/store';

export const sections = readable<Section[]>([], (set) => {
	let dbUnsub: () => void;
	let unsubbed = false;

	if (browser) {
		if (unsubbed) return;

		dbUnsub = onSnapshot(collection(db, 'sections'), (snapshot) => {
			if (snapshot.empty) {
				dbUnsub();
			}

			return set(
				snapshot.docs.map((d) => {
					return { uid: d.id, ...d.data() } as Section;
				})
			);
		});
	}

	return () => {
		unsubbed = true;
		if (dbUnsub) dbUnsub();
	};
});
