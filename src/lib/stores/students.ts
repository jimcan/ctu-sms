import { browser } from '$app/environment';
import { db } from '$lib/services/client';
import { collection, doc, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { readable, writable, type Readable, type Writable, derived } from 'svelte/store';
import { selectedSection } from './sections';

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

export const currentStudentUid: Writable<string | undefined> = writable();

type CurrentStudent = {
	index: number;
	value: Student;
};

export const studentsBySection: Readable<Student[]> = derived(
	[students, selectedSection],
	([stds, sec], set) => {
		set(sec === 'All' ? stds : stds.filter((s) => s.sectionCode === sec));
	}
);

export const currentStudent: Readable<CurrentStudent | undefined> = derived(
	[studentsBySection, currentStudentUid],
	([students, currentUid], set) => {
		const value = students.find((s) => s.uid === currentUid);

		if (value) {
			const index = students.indexOf(value);
			set({ index, value });
		}
	}
);
