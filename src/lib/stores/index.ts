import { browser } from '$app/environment';
import { db } from '$lib/services/client';
import { scheduleInTime } from '$lib/utils';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { collection, doc, onSnapshot, query, where } from 'firebase/firestore';
import { writable, type Readable, derived, readable } from 'svelte/store';

export const selectedDate = writable<Dayjs>(dayjs());
export const currentUid = writable<string | undefined | null>();
export const attendance = writable<Attendance[]>([]);
export const scores = writable<Score[]>([]);
export const currentSubject = writable<string | undefined>();

export const currentStudent: Readable<Student | undefined | null> = derived(
	currentUid,
	(uid, set) => {
		if (uid === null) return set(null);

		let unsub: () => void;

		if (browser && uid) {
			unsub = onSnapshot(doc(db, 'students', uid), (ss) => {
				if (ss.exists()) {
					set({ ...ss.data(), uid: ss.id } as Student);
				}
			});
		}

		return () => {
			if (unsub) return unsub();
		};
	}
);

export const schedules = readable<Schedule[]>([], (set) => {
	let unsub: () => void;

	if (browser) {
		unsub = onSnapshot(collection(db, 'schedules'), (ss) => {
			set(ss.docs.map((d) => ({ ...d.data(), uid: d.id } as Schedule)));
		});
	}

	return () => {
		if (unsub) return unsub();
	};
});

export const sections = readable<Section[]>([], (set) => {
	let unsub: () => void;
	if (browser) {
		unsub = onSnapshot(collection(db, 'sections'), (ss) => {
			set(ss.docs.map((d) => ({ ...d.data(), uid: d.id } as Section)));
		});
	}

	return () => {
		if (unsub) return unsub();
	};
});

export const subjects = readable<Subject[]>([], (set) => {
	let unsub: VoidFunction;

	if (browser) {
		unsub = onSnapshot(collection(db, 'subjects'), (ss) => {
			set(ss.docs.map((d) => ({ ...d.data(), uid: d.id } as Subject)));
		});
	}

	return () => {
		if (unsub) return unsub();
	};
});

export const resources: Readable<AppResource[]> = derived(currentSubject, (sub, set) => {
	let unsub: VoidFunction;
	if (!sub) return set([]);

	if (browser && sub) {
		unsub = onSnapshot(query(collection(db, 'resources'), where('subject', '==', sub)), (ss) => {
			set(ss.docs.map((d) => ({ ...d.data(), uid: d.id } as AppResource)));
		});
	}

	return () => {
		if (unsub) return unsub();
	};
});

export const currentSchedule: Readable<Schedule | undefined> = derived(
	schedules,
	(schedules, set) => {
		const interval = setInterval(() => {
			set(schedules.find((s) => scheduleInTime(s)));
		}, 1000);

		return () => clearInterval(interval);
	}
);
