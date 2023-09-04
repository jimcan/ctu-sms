<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import DatePicker from '$lib/components/DatePicker.svelte';
	import { saveDocument } from '$lib/services/client/firebase/db';
	import { getAttendanceStore } from '$lib/stores/attendance';
	import { students as studentsStore } from '$lib/stores/students';
	import { subjects as subjectsStore } from '$lib/stores/subjects';
	import { cn, getAttendanceToView } from '$lib/utils';
	import type { Dayjs } from 'dayjs';
	import dayjs from 'dayjs';
	import { Timestamp } from 'firebase/firestore';
	import { SkipBack, SkipForward } from 'lucide-svelte';

	let section = $page.url.searchParams.get('section');
	let students = $studentsStore.filter((s) => s.sectionCode === section);
	let student = students.find((s) => s.name === $page.params.name);

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
			goto(`/admin/students/${prevStudent?.name}?section=${section}`);
		}
	}

	function onNext() {
		if (nextStudent) {
			currentStudentIndex += 1;
			student = nextStudent;
			goto(`/admin/students/${nextStudent?.name}?section=${section}`);
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

<div class="flex flex-col w-full max-w-[100dvw] p-4">
	<div
		class={cn(
			'flex items-center self-center',
			'bg-base-100',
			'w-full gap-2 p-2 mb-2 max-w-sm',
			'border border-base-200 rounded-lg',
			'hover:drop-shadow-[0_0_4px_#3d98ff]'
		)}
	>
		<button disabled={!prevStudent} class="btn" on:click={onPrev}><SkipBack /></button>
		<div class="flex items-center justify-center bg-base-200 rounded-lg w-full h-full">
			<h1 class="text-xl font-semibold">{student?.name}</h1>
		</div>
		<button disabled={!nextStudent} class="btn" on:click={onNext}><SkipForward /></button>
	</div>
	<DatePicker bind:selected={date} />
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
			<select class="select select-bordered">
				{#each subjects ?? [] as sub}
					<option value={sub.uid}>{sub.codeName}</option>
				{/each}
			</select>
			<button class="btn" on:click={onAttendance}>Present</button>

			<button class="btn">Excuse</button>
			<input type="text" class="input input-bordered" placeholder="Reason" />
		</div>
	</div>
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
				<p>{dayjs(attendance.time.toDate()).format('HH:mm A')}</p>
			</div>
		</div>
	{/each}
</div>
