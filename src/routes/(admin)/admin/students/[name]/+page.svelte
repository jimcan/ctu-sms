<script lang="ts">
	import AttendanceDialog from './AttendanceDialog.svelte';
	import StudentDisplay from './StudentDisplay.svelte';
	import AttendanceDisplay from './AttendanceDisplay.svelte';
	import DatePicker from '$lib/components/DatePicker.svelte';
	import ScoreDialog from './ScoreDialog.svelte';
	import ScoreDisplay from './ScoreDisplay.svelte';
</script>

<div class="flex flex-col w-full max-w-[100dvw] p-4 items-center gap-2">
	<DatePicker />
	<StudentDisplay />
	<AttendanceDialog />
	<ScoreDialog />
	<AttendanceDisplay />
	<ScoreDisplay />
</div>
