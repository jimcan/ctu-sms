import { db } from '$lib/services/client';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { writable, type Readable, derived } from 'svelte/store';

export const students = writable<Student[]>([]);

export const selectedUid = writable<string | undefined>();
export const selectedSection = writable<string | undefined>();
export const selectedSubject = writable<string | undefined>();

type SelectedStudent = {
	index: number;
	value: Student;
};

export const studentsBySection: Readable<Student[]> = derived(
	[students, selectedSection],
	([students, section], set) => {
		if (!section || section === 'All') set(students);
		else set(students.filter((s) => s.sectionCode === section));
	}
);

export const selectedStudent: Readable<SelectedStudent | undefined> = derived(
	[studentsBySection, selectedUid],
	([students, uid], set) => {
		const value = students.find((s) => s.uid === uid);

		if (value) {
			const index = students.indexOf(value);
			set({ index, value });
		}
	}
);

export const selectedAttendance: Readable<Attendance[]> = derived(
	[selectedUid, selectedSubject],
	([uid, sub], set) => {
		set([]);
		let q = query(collection(db, 'attendance'), where('owner', '==', uid));

		if (sub) {
			q = query(collection(db, 'attendance'), where('owner', '==', uid), where('for', '==', sub));
		}

		onSnapshot(q, (snapshot) => {
			set(
				snapshot.docs.map((d) => {
					return { uid: d.id, ...d.data() } as Attendance;
				})
			);
		});
	}
);

export const selectedScores: Readable<Score[]> = derived(
	[selectedUid, selectedSubject],
	([uid, sub], set) => {
		set([]);
		let q = query(collection(db, 'scores'), where('owner', '==', uid));

		if (sub) {
			q = query(collection(db, 'scores'), where('owner', '==', uid), where('for', '==', sub));
		}

		onSnapshot(q, (snapshot) => {
			set(
				snapshot.docs.map((d) => {
					return { uid: d.id, ...d.data() } as Score;
				})
			);
		});
	}
);
