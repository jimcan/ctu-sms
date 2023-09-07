<script lang="ts">
	import Avatar from '$lib/components/Avatar.svelte';
	import { sections } from '$lib/stores/sections';
	import { students } from '$lib/stores/students';
	import { subjects } from '$lib/stores/subjects';
	import { toName } from '$lib/utils';
	import { FileText, Users2 } from 'lucide-svelte';

	$: threeStudents = $students?.slice(0, 3);
	$: threeSections = $sections?.slice(0, 3);
	$: threeSubjects = $subjects?.slice(0, 3);
</script>

<div class="grid md:grid-cols-2 p-4 md:p-8 gap-4 md:gap-8">
	<a
		href="/admin/students"
		class="flex flex-col bg-base-300 rounded-lg shadow-lg p-4 hover:drop-shadow-[0_0_4px_#3d98ff]"
	>
		<h4 class="text-xl font-semibold">Students</h4>
		<div class="divider" />
		{#if threeStudents}
			<div class="flex flex-col gap-4">
				{#each threeStudents as student}
					<div class="flex items-center gap-4">
						<Avatar {student} outline="accent" />
						<p class="text-lg font-semibold">
							{toName(student.firstname ?? '', student.lastname ?? '')}
						</p>
					</div>
				{/each}
			</div>
		{/if}
	</a>
	<a
		href="/admin/sections"
		class="flex flex-col bg-base-300 rounded-lg shadow-lg p-4 hover:drop-shadow-[0_0_4px_#3d98ff]"
	>
		<h4 class="text-xl font-semibold">Sections</h4>
		<div class="divider" />
		<div class="flex flex-col gap-4">
			{#each threeSections as section}
				<div class="flex items-center gap-4">
					<Users2 />
					<p class="text-lg font-semibold">{section.name}</p>
				</div>
			{/each}
		</div>
	</a>
	<a
		href="/admin/subjects"
		class="flex flex-col bg-base-300 rounded-lg shadow-lg p-4 hover:drop-shadow-[0_0_4px_#3d98ff]"
	>
		<h4 class="text-xl font-semibold">Subjects</h4>
		<div class="divider" />
		<div class="flex flex-col gap-4">
			{#each threeSubjects as subject}
				<div class="flex items-center gap-4">
					<FileText />
					<p class="text-lg font-semibold">{subject.uid}</p>
				</div>
			{/each}
		</div>
	</a>
</div>
