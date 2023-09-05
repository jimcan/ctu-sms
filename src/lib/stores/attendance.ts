import { browser } from '$app/environment';
import { db } from '$lib/services/client';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { readable } from 'svelte/store';

export function getAttendanceStore(owner: string, subject?: string) {
	return readable<Attendance[]>([], (set) => {
		let dbUnsub: () => void;
		let unsubbed = false;

		if (browser) {
			if (unsubbed) return;

			let q = query(collection(db, 'attendance'), where('owner', '==', owner));

			if (subject) {
				q = query(
					collection(db, 'attendance'),
					where('owner', '==', owner),
					where('for', '==', subject)
				);
			}

			dbUnsub = onSnapshot(q, (snapshot) => {
				if (snapshot.empty) {
					dbUnsub();
				}

				return set(
					snapshot.docs.map((d) => {
						return { uid: d.id, ...d.data() } as Attendance;
					})
				);
			});
		}

		return () => {
			unsubbed = true;
			if (dbUnsub) dbUnsub();
		};
	});
}
