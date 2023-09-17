import { db } from '$lib/services/client';
import { collection, doc, onSnapshot, query, where } from 'firebase/firestore';
import { writable, type Readable, derived } from 'svelte/store';

export const currentUid = writable<string | undefined>();

export const currentStudent: Readable<Student | undefined> = derived(currentUid, (uid, set) => {
	if (uid) {
		onSnapshot(doc(db, 'students', uid), (snapshot) => {
			if (snapshot.exists()) {
				const student = { uid: snapshot.id, ...snapshot.data() } as Student;
				set(student);
			}
		});
	}
});

export const currentAttendance: Readable<Attendance[]> = derived(currentUid, (uid, set) => {
	if (uid) {
		onSnapshot(query(collection(db, 'attendance'), where('owner', '==', uid)), (snapshot) => {
			if (snapshot.empty) set([]);
			const attendance = snapshot.docs.map((a) => ({ ...a.data(), uid: a.id } as Attendance));
			const a = attendance.filter((a, i) => typeof a.time === 'undefined');
			set(attendance);
		});
	} else {
		set([]);
	}
});

export const currentScores: Readable<Score[]> = derived(currentUid, (uid, set) => {
	if (uid) {
		onSnapshot(query(collection(db, 'scores'), where('owner', '==', uid)), (snapshot) => {
			if (snapshot.empty) set([]);
			const scores = snapshot.docs.map((a) => ({ ...a.data(), uid: a.id } as Score));
			set(scores);
		});
	} else {
		set([]);
	}
});
