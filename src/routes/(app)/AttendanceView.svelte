<script lang="ts">
	import { displayDate, getAttendanceToView } from '$lib/utils';
	import { date } from '$lib/stores/date';
	import { currentAttendance } from '$lib/stores/my-details';
	import { EventListTile } from '$lib/components';

	$: attendanceToView = getAttendanceToView($currentAttendance, $date.toDate());
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
				<p>{displayDate(attendance.time.toDate(), 'hh:mm A')}</p>
			</div>
		</EventListTile>
	{/each}
</div>
