<script lang="ts">
	import Avatar from '$lib/components/Avatar.svelte';
	import { appState } from '$lib/stores/app-state';
	import { sections } from '$lib/stores/sections';
	import { students } from '$lib/stores/students.js';
	import { cn, toName } from '$lib/utils.js';
	import { currentSelectedSection } from './section';

	let selectedSection = $currentSelectedSection ?? $sections[0]?.uid;
	$: selectedSection && currentSelectedSection.set(selectedSection);
	$: bySection = $students.filter((s) => s.sectionCode === $currentSelectedSection);
</script>

<div class={cn('flex flex-col')}>
	<div class={cn('flex justify-between', 'p-4', 'bg-base-300')}>
		<div class="form-control">
			<label for="section" class="label">Section</label>
			<select class="select" name="section" bind:value={selectedSection}>
				{#each $sections as section}
					<option value={section.uid}>
						{section.name}
					</option>
				{/each}
			</select>
		</div>
		<div class="form-control">
			<label for="no" class="label">Number of students</label>
			<input type="text" name="no" class="input w-40" value={bySection.length} />
		</div>
	</div>
	{#if $appState.loading}
		<div class="loading loading-spinner m-8 self-center" />
	{:else}
		<div class={cn('flex flex-col', 'gap-2', 'p-4 md:p-8')}>
			{#each bySection as student}
				{@const name = toName(student.firstname, student.lastname)}
				<a
					class={cn('flex items-center', 'p-3 gap-3', 'bg-base-300 hover:bg-primary', 'rounded-lg')}
					href="/admin/students/{name}?section={selectedSection}"
				>
					<Avatar {student} />
					<span class="text-lg">{student.idNumber}</span>
					<span>{name}</span>
				</a>
			{/each}
		</div>
	{/if}
</div>
