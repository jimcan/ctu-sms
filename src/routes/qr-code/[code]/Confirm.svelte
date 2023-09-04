<script lang="ts">
	import { saveDocument } from '$lib/services/client/firebase/db';
	import { getAttendanceStore } from '$lib/stores/attendance';
	import dayjs from 'dayjs';
	import { Timestamp } from 'firebase/firestore';
	import { onMount } from 'svelte';

	export let uid: string;
	export let subject: string;

	const attendanceStore = getAttendanceStore(uid);

	let done = false;
	let busy = false;

	async function saveAttendance() {
		const a: Attendance = {
			for: subject,
			owner: uid,
			time: Timestamp.fromDate(new Date())
		};

		await saveDocument<Attendance>('attendance', a);
	}

	onMount(async () => {
		if ($attendanceStore.some((a) => dayjs().isSame(a.time.toDate(), 'day'))) {
			done = true;
		} else {
			busy = true;
			await saveAttendance();
			busy = false;
		}
	});
</script>

{#if done}
	<p>You're already present for todays class</p>
{:else if busy}
	<span>
		Saving <div class="loading loading-dots loading-md" />
	</span>
{:else}
	<span>Success</span>
{/if}
