<script lang="ts">
	import '../app.css';
	import type { LayoutData } from './$types';
	import { attendance, currentUid, scores } from '$lib/stores';
	import { browser } from '$app/environment';
	import { collection, onSnapshot, query, where } from 'firebase/firestore';
	import { db } from '$lib/services/client';

	export let data: LayoutData;

	$: session = data.userSession;
	$: currentUid.set(session?.uid);

	$: {
		if (browser && $currentUid) {
			onSnapshot(query(collection(db, 'attendance'), where('owner', '==', $currentUid)), (ss) => {
				attendance.set(ss.docs.map((d) => ({ ...d.data(), uid: d.id } as Attendance)));
			});

			onSnapshot(query(collection(db, 'scores'), where('owner', '==', $currentUid)), (ss) => {
				scores.set(ss.docs.map((d) => ({ ...d.data(), uid: d.id } as Score)));
			});
		}
	}
</script>

<slot />
