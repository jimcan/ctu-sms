<script lang="ts">
	import EventListTile from '$lib/components/EventListTile.svelte';
	import { deleteDocument } from '$lib/services/client';
	import { selectedDate } from '$lib/stores';
	import { selectedAttendance } from '$lib/stores/admin';
	import { displayTime, getAttendanceToView } from '$lib/utils';

	$: attendanceToView = getAttendanceToView($selectedAttendance, $selectedDate.toDate());

	async function onDelete(uid?: string) {
		if (uid) await deleteDocument('attendance', uid);
	}
</script>

{#each attendanceToView as attendance}
	<EventListTile onClose={() => onDelete(attendance.uid)}>
		<div class="flex gap-4">
			<strong>Subject :</strong>
			<p>{attendance.for}</p>
		</div>
		<div class="flex gap-4">
			<strong>Time :</strong>
			<p>{displayTime(attendance.time.toDate())}</p>
		</div>
	</EventListTile>
{/each}
