import { browser } from '$app/environment';
import { db } from '$lib/services/client';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { readable } from 'svelte/store';

export const getAttendanceStore = (owner: string) =>
	readable<Attendance[]>([], (set) => {
		let dbUnsub: () => void;
		let unsubbed = false;

		if (browser) {
			if (unsubbed) return;

			dbUnsub = onSnapshot(
				query(collection(db, 'attendance'), where('owner', '==', owner)),
				(snapshot) => {
					if (snapshot.empty) {
						dbUnsub();
					}

					return set(
						snapshot.docs.map((d) => {
							return { uid: d.id, ...d.data() } as Attendance;
						})
					);
				}
			);
		}

		return () => {
			unsubbed = true;
			if (dbUnsub) dbUnsub();
		};
	});
