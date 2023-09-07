<script lang="ts">
	import AttendanceDisplay from './AttendanceDisplay.svelte';

	import ScoreForm from './ScoreForm.svelte';

	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import DatePicker from '$lib/components/DatePicker.svelte';
	import { LabeledInput } from '$lib/components/ui/labeled-input';
	import { LabeledSelect } from '$lib/components/ui/labeled-select';
	import { saveDocument } from '$lib/services/client/firebase/db';
	import { getAttendanceStore } from '$lib/stores/attendance';
	import { students as studentsStore } from '$lib/stores/students';
	import { subjects as subjectsStore } from '$lib/stores/subjects';
	import { cn, getAttendanceToView, toName } from '$lib/utils';
	import type { Dayjs } from 'dayjs';
	import dayjs from 'dayjs';
	import { Timestamp } from 'firebase/firestore';
	import { SkipBack, SkipForward } from 'lucide-svelte';

	let section = $page.url.searchParams.get('section');
	let students = $studentsStore.filter((s) => s.sectionCode === section);
	let student = students.find(
		(s) => toName(s.firstname ?? '', s.lastname ?? '') === $page.params.name
	);

	$: currentStudentIndex = student ? students.indexOf(student) : 0;
	$: prevStudent = currentStudentIndex > 0 ? students.at(currentStudentIndex - 1) : undefined;
	$: nextStudent = students.at(currentStudentIndex + 1);

	let date: Dayjs;

	$: attendanceStore = getAttendanceStore(student?.uid ?? '');
	$: attendanceToView = getAttendanceToView($attendanceStore, date?.toDate());
	$: subjects = $subjectsStore;
	$: subject = subjects[0];

	function onPrev() {
		if (prevStudent) {
			currentStudentIndex -= 1;
			student = prevStudent;
			goto(
				`/admin/students/${toName(
					prevStudent?.firstname ?? '',
					prevStudent?.lastname ?? ''
				)}?section=${section}`
			);
		}
	}

	function onNext() {
		if (nextStudent) {
			currentStudentIndex += 1;
			student = nextStudent;
			goto(
				`/admin/students/${toName(
					nextStudent.firstname ?? '',
					nextStudent.lastname ?? ''
				)}?section=${section}`
			);
		}
	}

	async function onAttendance() {
		if (student?.uid) {
			await saveDocument<Attendance>('attendance', {
				for: 'in',
				owner: student?.uid,
				time: Timestamp.fromDate(new Date())
			});
		}
	}
</script>

<div class="flex flex-col w-full max-w-[100dvw] p-4 items-center gap-2">
	<DatePicker bind:selected={date} />
	<div class="avatar mt-4">
		<div class="w-64 rounded">
			<img src={student?.photoUrl} alt="" />
		</div>
	</div>
	<div
		class={cn(
			'flex items-center',
			'bg-base-100',
			'w-full gap-2 p-2 mb-2 max-w-sm',
			'border border-base-200 rounded-2xl',
			'hover:drop-shadow-[0_0_4px_#3d98ff]'
		)}
	>
		<button disabled={!prevStudent} class="btn" on:click={onPrev}><SkipBack /></button>
		<div class="flex items-center justify-center bg-base-200 rounded-lg w-full h-full">
			<h1 class="text-xl font-semibold">
				{toName(student?.firstname ?? '', student?.lastname ?? '')}
			</h1>
		</div>
		<button disabled={!nextStudent} class="btn" on:click={onNext}><SkipForward /></button>
	</div>
	<div
		class={cn(
			'grid grid-cols-2',
			'gap-4 p-2',
			'bg-base-100',
			'w-full max-w-sm',
			'border border-base-200 rounded-2xl',
			'hover:drop-shadow-[0_0_4px_#3d98ff]'
		)}
	>
		<button class="btn" on:click={onAttendance}>Present</button>
		<button class="btn">Excuse</button>
	</div>
	{#if student}
		<ScoreForm bind:studentId={student.uid} />
	{/if}

	{#if student}
		<AttendanceDisplay bind:studentId={student.uid} />
	{/if}
</div>
