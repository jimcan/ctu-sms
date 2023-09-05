<script lang="ts">
	import dayjs from 'dayjs';
	import { cn, displayDate, getAttendanceToView } from '$lib/utils';
	import { getAttendanceStore } from '$lib/stores/attendance.js';
	import { subjects } from '$lib/stores/subjects';

	export let uid: string;

	const attendanceStore = getAttendanceStore(uid);

	$: attendanceToView = getAttendanceToView($attendanceStore, dayjs().toDate());

	function getSubjectName(code: string) {
		return $subjects.find((s) => s.uid === code)?.codeName;
	}
</script>

{#each attendanceToView as attendance}
	<div class={cn('flex', 'bg-base-200', 'rounded-lg', 'hover:drop-shadow-[0_0_4px_#3d98ff]')}>
		<div
			class={cn('flex items-center justify-center', 'bg-accent/50', 'w-10 md:w-12', 'rounded-l-lg')}
		>
			<p class="label">Attendance</p>
		</div>
		<div class={cn('flex flex-col justify-evenly gap-2', 'p-4')}>
			<div class="flex gap-4">
				<strong>Subject:</strong>
				<p>{getSubjectName(attendance.for)}</p>
			</div>
			<div class="flex gap-4">
				<strong>Time:</strong>
				<p>{displayDate(attendance.time.toDate(), 'HH:mm A')}</p>
			</div>
		</div>
	</div>
{/each}

<style>
	.label {
		writing-mode: vertical-rl;
		white-space: nowrap;
		letter-spacing: -1px;
		font-weight: 500;
		text-transform: uppercase;
		font-size: small;
	}
</style>
