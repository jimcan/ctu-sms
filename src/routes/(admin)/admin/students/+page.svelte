<script lang="ts">
	import { appState } from '$lib/stores/app-state';
	import { sections } from '$lib/stores/sections';
	import { students } from '$lib/stores/students.js';
	import { cn } from '$lib/utils.js';

	let selectedSection = $sections[0]?.uid;
	$: bySection = $students.filter((s) => s.sectionCode === selectedSection);
</script>

<div class={cn('flex flex-col')}>
	<select class="select" bind:value={selectedSection}>
		{#each $sections as section}
			<option value={section.uid}>
				{section.name}
			</option>
		{/each}
	</select>
	{#if $appState.loading}
		<div class="loading loading-dots m-8 self-center" />
	{:else}
		<div class={cn('flex flex-col', 'gap-4')}>
			{#each bySection as student}
				<a class="btn" href="/admin/students/{student.name}?section={selectedSection}"
					>{student.name}</a
				>
			{/each}
		</div>
	{/if}
</div>
