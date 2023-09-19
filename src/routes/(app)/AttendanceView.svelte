<script lang="ts">
	import { displayTime, getAttendanceToView } from '$lib/utils';
	import { EventListTile } from '$lib/components';
	import { attendance, selectedDate } from '$lib/stores';

	$: attendanceToView = getAttendanceToView($attendance, $selectedDate.toDate());
</script>

<div class="flex flex-col gap-4 max-w-sm self-center w-full">
	{#each attendanceToView as attendance}
		<EventListTile type="attendance">
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
</div>
