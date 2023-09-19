<script lang="ts">
	import { goto } from '$app/navigation';
	import Avatar from '$lib/components/Avatar.svelte';
	import { selectedSection, selectedUid, studentsBySection } from '$lib/stores/admin';
	import { sections } from '$lib/stores';
	import { cn, toName } from '$lib/utils.js';

	function onSelect(s: Student) {
		selectedUid.set(s.uid);
		goto(`/admin/students/${toName(s.firstname, s.lastname)}`);
	}
</script>

<div class={cn('flex flex-col')}>
	<div class={cn('flex justify-between', 'p-4', 'bg-base-300')}>
		<div class="form-control">
			<label for="section" class="label">Section</label>
			<select
				class="select"
				name="section"
				value={$selectedSection}
				on:change={(e) => selectedSection.set(e.currentTarget.value)}
			>
				<option value="All">All</option>
				{#each $sections as section}
					<option value={section.uid}>
						{section.name}
					</option>
				{/each}
			</select>
		</div>
		<div class="form-control">
			<label for="no" class="label">Number of students</label>
			<input type="text" name="no" class="input w-40" value={$studentsBySection.length} />
		</div>
	</div>
	<div class={cn('flex flex-col', 'gap-2', 'p-4 md:p-8')}>
		{#each $studentsBySection as student}
			{@const name = toName(student.firstname, student.lastname)}
			<button
				class={cn('flex items-center', 'p-3 gap-3', 'bg-base-300 hover:bg-primary', 'rounded-lg')}
				on:click={() => onSelect(student)}
			>
				<Avatar {student} />
				<span class="text-lg">{student.idNumber}</span>
				<span>{name}</span>
			</button>
		{/each}
	</div>
</div>
