<script lang="ts">
	import ConfirmDialog from '../../../../lib/components/ConfirmDialog.svelte';

	import { PenSquare } from 'lucide-svelte';
	import { sections } from '$lib/stores/sections';
	import { cn } from '$lib/utils';
	import { deleteDocument } from '$lib/services/client/firebase/db';

	async function onDelete(uid?: string) {
		if (!uid) return;
		await deleteDocument('sections', uid);
	}
</script>

<div class="flex flex-col justify-center items-center w-[100dvw] md:w-full">
	<div class={cn('flex justify-between items-center', 'bg-base-300', 'w-full', 'p-4 md:p-8')}>
		<h1 class="text-xl font-semibold">Sections</h1>
		<a href="/admin/sections/new" class="btn btn-outline">Add New Section</a>
	</div>
	<div class={cn('flex p-4 w-full justify-center', 'md:p-8')}>
		<div class="overflow-x-auto max-w-6xl w-full bg-base-300 rounded-lg shadow-lg p-2">
			<table class="table">
				<thead class="text-lg">
					<tr>
						<th />
						<th>Section Name</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{#each $sections as section, i}
						<tr class="hover">
							<th>{i + 1}</th>
							<td class="truncate">{section.name}</td>
							<td class="join">
								<a href="/admin/sections/{section.name}" class="btn btn-sm join-item">
									<PenSquare size={18} />
								</a>
								<ConfirmDialog
									title="Delete '{section.name}'?"
									message="Are you sure you want to delete this section '{section.name}'"
									on:click={() => onDelete(section.uid)}
								/>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>
