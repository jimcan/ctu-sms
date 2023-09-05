<script lang="ts">
	import { saveDocument } from '$lib/services/client/firebase/db';
	import { getAttendanceStore } from '$lib/stores/attendance';
	import dayjs from 'dayjs';
	import { Timestamp } from 'firebase/firestore';
	import { onMount } from 'svelte';

	export let uid: string;
	export let subject: string;

	const attendanceStore = getAttendanceStore(uid, subject);

	$: hasAttendances = $attendanceStore.length > 0;

	let done = false;
	let busy = false;

	async function saveAttendance() {
		if (done) return;
		busy = true;
		const a: Attendance = {
			for: subject,
			owner: uid,
			time: Timestamp.fromDate(new Date())
		};

		await saveDocument<Attendance>('attendance', a);
		busy = false;
	}

	onMount(async () => {
		if (hasAttendances) {
			if ($attendanceStore.some((a) => dayjs().isSame(a.time.toDate(), 'day'))) {
				done = true;
			} else {
				await saveAttendance();
			}
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
