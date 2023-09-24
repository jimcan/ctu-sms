<script lang="ts">
	import AttendanceDialog from './AttendanceDialog.svelte';
	import StudentDisplay from './StudentDisplay.svelte';
	import AttendanceDisplay from './AttendanceDisplay.svelte';
	import DatePicker from '$lib/components/DatePicker.svelte';
	import ScoreDialog from './ScoreDialog.svelte';
	import ScoreDisplay from './ScoreDisplay.svelte';
	import { selectedStudent, selectedSubject } from '$lib/stores/admin';
	import { currentSchedule } from '$lib/stores';

	$: subjects = $selectedStudent?.value.subjectCodes ?? [];
	$: selectedSubject.set($currentSchedule?.subject ?? subjects.at(0));
</script>

<div class="flex flex-col w-full max-w-[100dvw] p-4 items-center gap-2">
	<DatePicker />
	<StudentDisplay />
	<div class="max-w-sm items-center join w-full">
		<div class="flex items-center justify-center w-1/3 bg-base-200 h-full">
			<p class="whitespace-nowrap join-item uppercase">Subject</p>
		</div>
		<select
			class="select select-bordered join-item w-2/3"
			value={$selectedSubject}
			on:change={(e) => selectedSubject.set(e.currentTarget.value)}
		>
			{#each subjects as sub}
				<option value={sub}>{sub}</option>
			{/each}
		</select>
	</div>
	<AttendanceDialog />
	<ScoreDialog />
	<AttendanceDisplay />
	<ScoreDisplay />
</div>
