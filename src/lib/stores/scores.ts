import { browser } from '$app/environment';
import { db } from '$lib/services/client';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { derived, readable, type Readable } from 'svelte/store';
import { currentStudentUid } from './students';
import { selectedSubject } from './subjects';

export const scores: Readable<Score[]> = derived(
	[currentStudentUid, selectedSubject],
	([uid, sub], set) => {
		let q = query(collection(db, 'scores'), where('owner', '==', uid));

		if (sub) {
			q = query(collection(db, 'scores'), where('owner', '==', uid), where('for', '==', sub));
		}

		onSnapshot(q, (snapshot) => {
			if (snapshot.empty) set([]);

			set(
				snapshot.docs.map((d) => {
					return { uid: d.id, ...d.data() } as Score;
				})
			);
		});
	}
);
