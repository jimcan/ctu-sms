<script lang="ts">
	import { getAttendanceStore } from '$lib/stores/attendance';
	import { cn, getAttendanceToView } from '$lib/utils';
	import type { Dayjs } from 'dayjs';
	import dayjs from 'dayjs';

	export let studentUid: string;

	let date: Dayjs;

	$: attendanceStore = getAttendanceStore(studentUid);
	$: attendanceToView = getAttendanceToView($attendanceStore, date?.toDate());
</script>

{#each attendanceToView as attendance}
	<div
		class={cn(
			'flex flex-col',
			'bg-base-100',
			'p-2 mt-2',
			'border border-base-200 rounded-lg',
			'hover:drop-shadow-[0_0_4px_#3d98ff]'
		)}
	>
		<h4 class="font-semibold mb-2">Attendance</h4>
		<div class="flex flex-col sm:flex-row gap-2">
			<h2>Time:</h2>
			<p>{dayjs(attendance.time.toDate()).format('hh:mm A')}</p>
		</div>
	</div>
{/each}
