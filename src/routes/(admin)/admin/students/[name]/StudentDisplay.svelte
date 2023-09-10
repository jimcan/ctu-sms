<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { students as studentsStore } from '$lib/stores/students';
	import { cn, toName } from '$lib/utils';
	import { SkipBack, SkipForward } from 'lucide-svelte';

	let section = $page.url.searchParams.get('section');
	let students =
		section === 'All' ? $studentsStore : $studentsStore.filter((s) => s.sectionCode === section);
	export let student = students.find(
		(s) => toName(s.firstname ?? '', s.lastname ?? '') === $page.params.name
	);

	$: currentStudentIndex = student ? students.indexOf(student) : 0;
	$: prevStudent = currentStudentIndex > 0 ? students.at(currentStudentIndex - 1) : undefined;
	$: nextStudent = students.at(currentStudentIndex + 1);

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
</script>

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
