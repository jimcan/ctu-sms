<script lang="ts">
	import { saveDocument } from '$lib/services/client/firebase/db';
	import { attendance as attendanceStore } from '$lib/stores';
	import dayjs from 'dayjs';
	import { Timestamp } from 'firebase/firestore';
	import { onMount } from 'svelte';

	export let uid: string;
	export let subject: string;

	$: aStore = $attendanceStore;

	let done = false;
	let busy = false;
	let attendance: Attendance | undefined;

	function aIsToday(a: Attendance) {
		return dayjs().isSame(a.time.toDate(), 'day') && a.for === subject;
	}

	async function saveAttendance() {
		if (aStore.some((a) => aIsToday(a))) {
			return (done = true);
		}

		busy = true;
		attendance = {
			for: subject,
			owner: uid,
			time: Timestamp.fromDate(new Date())
		};

		await saveDocument<Attendance>('attendance', attendance);
		busy = false;
	}

	onMount(async () => {
		await saveAttendance();
	});
</script>

{#if done}
	<p class="text-warning">You've already scanned this Attendance QR.</p>
{:else if busy}
	<span>
		Saving attendance <div class="loading loading-dots loading-md" />
	</span>
{:else}
	<div class="flex flex-col gap-2">
		<h4 class="text-success italic">Attendance saved!</h4>
		<p><strong>Subject :</strong> {attendance?.for}</p>
		<p><strong>Time :</strong> {dayjs(attendance?.time.toDate()).format('hh:mm A')}</p>
	</div>
{/if}
