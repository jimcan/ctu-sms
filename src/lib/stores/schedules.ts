import { browser } from '$app/environment';
import { db } from '$lib/services/client';
import { scheduleInTime } from '$lib/utils';
import { collection, onSnapshot } from 'firebase/firestore';
import { derived, readable, type Readable } from 'svelte/store';

export const schedules = readable<Schedule[]>([], (set) => {
	let dbUnsub: () => void;
	let unsubbed = false;

	if (browser) {
		if (unsubbed) return;

		dbUnsub = onSnapshot(collection(db, 'schedules'), (snapshot) => {
			if (snapshot.empty) {
				dbUnsub();
			}

			console.log('loading schedule');

			return set(
				snapshot.docs.map((d) => {
					return { uid: d.id, ...d.data() } as Schedule;
				})
			);
		});
	}

	return () => {
		unsubbed = true;
		if (dbUnsub) dbUnsub();
	};
});

export const currentSchedule = derived<Readable<Schedule[]>, Schedule | undefined>(
	schedules,
	(values, set) => {
		const interval = setInterval(() => {
			set(values.find((s) => scheduleInTime(s)));
		}, 1000);

		return () => clearInterval(interval);
	}
);
