<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';
	import { db } from '$lib/services/client';
	import type { LayoutData } from './$types';
	import {
		attendance,
		currentStudent,
		isAdmin,
		schedules,
		scores,
		sections,
		subjects
	} from '$lib/stores';
	import { collection, doc, onSnapshot, query, where } from 'firebase/firestore';

	export let data: LayoutData;
	$: session = data.userSession;

	onMount(() => {
		if (session) {
			const uid = session.uid;

			isAdmin.set(session.admin);

			onSnapshot(doc(db, 'students', uid), (ss) => {
				if (ss.exists()) {
					currentStudent.set({ ...ss.data(), uid: ss.id } as Student);
				}
			});

			onSnapshot(query(collection(db, 'attendance'), where('owner', '==', uid)), (ss) => {
				attendance.set(ss.docs.map((d) => ({ ...d.data(), uid: d.id } as Attendance)));
			});

			onSnapshot(query(collection(db, 'scores'), where('owner', '==', uid)), (ss) => {
				scores.set(ss.docs.map((d) => ({ ...d.data(), uid: d.id } as Score)));
			});

			onSnapshot(collection(db, 'sections'), (ss) => {
				sections.set(ss.docs.map((d) => ({ ...d.data(), uid: d.id } as Section)));
			});

			onSnapshot(collection(db, 'subjects'), (ss) => {
				subjects.set(ss.docs.map((d) => ({ ...d.data(), uid: d.id } as Subject)));
			});

			onSnapshot(collection(db, 'schedules'), (ss) => {
				schedules.set(ss.docs.map((d) => ({ ...d.data(), uid: d.id } as Schedule)));
			});

			console.log('reloading...');
		}
	});
</script>

<slot />
