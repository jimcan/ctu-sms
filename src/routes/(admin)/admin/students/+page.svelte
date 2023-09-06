<script lang="ts">
	import { appState } from '$lib/stores/app-state';
	import { sections } from '$lib/stores/sections';
	import { students } from '$lib/stores/students.js';
	import { cn } from '$lib/utils.js';

	let selectedSection = $sections[0]?.uid;
	$: bySection = $students.filter((s) => s.sectionCode === selectedSection);
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
			<input type="text" name="no" class="input" value={bySection.length} />
		</div>
	</div>
	{#if $appState.loading}
		<div class="loading loading-spinner m-8 self-center" />
	{:else}
		<div class={cn('flex flex-col', 'gap-2', 'p-4 md:p-8')}>
			{#each bySection as student}
				<a
					class={cn('flex', 'p-3 gap-3', 'bg-base-300 hover:bg-primary', 'rounded-lg')}
					href="/admin/students/{student.name}?section={selectedSection}"
				>
					{student.name}
				</a>
			{/each}
		</div>
	{/if}
</div>
