<script lang="ts">
	import Avatar from '$lib/components/Avatar.svelte';
	import { currentSchedule, sections, subjects } from '$lib/stores';
	import { selectedResources, studentsBySection } from '$lib/stores/admin';
	import { timeToDisplay, toName } from '$lib/utils';
	import { CircleSlash2, Download, File, FileText, TimerOff, Users2, Youtube } from 'lucide-svelte';
	import fileIcon from '$lib/images/file.png';

	$: threeStudents = $studentsBySection?.slice(0, 3);
	$: threeSections = $sections?.slice(0, 3);
	$: threeSubjects = $subjects?.slice(0, 3);
	$: threeResources = $selectedResources?.slice(0, 3) ?? [];
</script>

<div class="grid md:grid-cols-2 p-4 md:p-8 gap-4 md:gap-8">
	<a
		href="admin/schedules"
		class="flex flex-col bg-base-300 rounded-lg shadow-lg p-4 hover:drop-shadow-[0_0_4px_#3d98ff]"
	>
		<h4 class="text-xl font-semibold">Current Schedule</h4>
		<div class="divider" />
		{#if $currentSchedule}
			{@const sched = $currentSchedule}
			<div class="flex flex-col">
				<span class="flex">
					<strong class="w-24">Section :</strong>
					<p>{sched.section}</p>
				</span>
				<span class="flex">
					<strong class="w-24">Subject :</strong>
					<p>{sched.subject}</p>
				</span>
				<span class="flex">
					<strong class="w-24">Days :</strong>
					<p>{sched.days.join('')}</p>
				</span>
				<span class="flex">
					<strong class="w-24">Start :</strong>
					<p>{timeToDisplay(sched.start)}</p>
				</span>
				<span class="flex">
					<strong class="w-24">End :</strong>
					<p>{timeToDisplay(sched.end)}</p>
				</span>
			</div>
		{:else}
			<span class="flex gap-2 items-center text-lg">
				<TimerOff size={18} />
				Vacant
			</span>
		{/if}
	</a>
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
		href="/admin/resources"
		class="flex flex-col bg-base-300 rounded-lg shadow-lg p-4 hover:drop-shadow-[0_0_4px_#3d98ff]"
	>
		<h4 class="text-xl font-semibold">Resources</h4>
		<div class="divider" />
		{#if threeResources.length > 0}
			<div class="flex flex-col gap-4">
				{#each threeResources as resource}
					<div class="flex items-center gap-4">
						{#if resource.type === 'link'}
							<Youtube />
						{:else}
							<File />
						{/if}
						<p class="text-lg font-semibold">
							"{resource.title}"
						</p>
						<p class="link">{resource.filename}</p>
					</div>
				{/each}
			</div>
		{:else}
			<span class="flex gap-2 items-center text-lg">
				<CircleSlash2 size={18} />
				Empty
			</span>
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
