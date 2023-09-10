<script lang="ts">
	import StudentDisplay from './StudentDisplay.svelte';
	import AttendanceForm from './AttendanceForm.svelte';
	import AttendanceDisplay from './AttendanceDisplay.svelte';
	import ScoreForm from './ScoreForm.svelte';
	import DatePicker from '$lib/components/DatePicker.svelte';
	import type { Dayjs } from 'dayjs';

	let date: Dayjs;
	let student: Student | undefined;
</script>

<div class="flex flex-col w-full max-w-[100dvw] p-4 items-center gap-2">
	<DatePicker bind:selected={date} />
	<StudentDisplay bind:student />
	{#if student}
		<AttendanceForm bind:studentUid={student.uid} />
	{/if}
	{#if student}
		<ScoreForm bind:studentUid={student.uid} />
	{/if}

	{#if student}
		<AttendanceDisplay bind:studentUid={student.uid} />
	{/if}
</div>
