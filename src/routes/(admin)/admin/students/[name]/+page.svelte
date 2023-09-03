<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import DatePicker from '$lib/components/DatePicker.svelte';
	import { students as studentsStore } from '$lib/stores/students';
	import { cn } from '$lib/utils';
	import type { Dayjs } from 'dayjs';
	import { SkipBack, SkipForward } from 'lucide-svelte';

	let section = $page.url.searchParams.get('section');
	let students = $studentsStore.filter((s) => s.sectionCode === section);
	let student = students.find((s) => s.name === $page.params.name);

	$: currentStudentIndex = student ? students.indexOf(student) : 0;
	$: prevStudent = currentStudentIndex > 0 ? students.at(currentStudentIndex - 1) : undefined;
	$: nextStudent = students.at(currentStudentIndex + 1);

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

	let date: Dayjs;

	$: console.log(date?.toString());
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
			<button class="btn">Present</button>
			<button class="btn">Excuse</button>
			<input type="text" class="input input-bordered" placeholder="Reason" />
		</div>
	</div>
	<div
		class={cn(
			'flex flex-col',
			'bg-base-100',
			'p-2 mt-2',
			'border border-base-200 rounded-lg',
			'hover:drop-shadow-[0_0_4px_#3d98ff]'
		)}
	>
		<h4 class="font-semibold mb-2">Score</h4>
		<div class="flex flex-col sm:flex-row gap-2">
			<select class="select select-bordered">
				<option value="midterm">Midterm</option>
				<option value="final">Final</option>
			</select>
			<div class="flex gap-2">
				<select class="select select-bordered">
					<option value="quiz">Quiz</option>
					<option value="assignment">Assignment</option>
					<option value="exam">Exam</option>
					<option value="participation">Participation</option>
					<option value="project">Project</option>
				</select>
				<input type="number" class="input input-bordered w-full" />
			</div>
			<button class="btn">Excuse</button>
			<input type="text" class="input input-bordered" placeholder="Reason" />
		</div>
	</div>
</div>
