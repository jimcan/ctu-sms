<script lang="ts">
	import { PenSquare } from 'lucide-svelte';
	import { cn } from '$lib/utils';
	import { deleteDocument } from '$lib/services/client/firebase/db';
	import { ConfirmDialog } from '$lib/components';
	import { selectedResources } from '$lib/stores/admin';
	import { deleteFile } from '$lib/services/client/firebase/storage';

	let busy = false;

	async function onDelete(resource: AppResource) {
		busy = true;
		await deleteFile(resource.filename ?? '', `resources/${resource.subject}`);
		await deleteDocument('resources', resource.uid ?? '');
		busy = false;
	}
</script>

<div class="flex flex-col justify-center items-center w-[100dvw] md:w-full">
	<div class={cn('flex justify-between items-center', 'bg-base-300', 'w-full', 'p-4 md:p-8')}>
		<h1 class="text-xl font-semibold">Resources</h1>
		<a href="/admin/resources/new" class="btn btn-outline">Add New Resource</a>
	</div>
	<div class={cn('flex p-4 w-full justify-center', 'md:p-8')}>
		<div class="overflow-x-auto max-w-6xl w-full bg-base-300 rounded-lg shadow-lg p-2">
			<table class="table">
				<thead>
					<tr>
						<th />
						<th>Subject</th>
						<th>Title</th>
						<th>Description</th>
						<th>Filename</th>
						<th>Link ID</th>
						<th>Type</th>
						<th>URL</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{#each $selectedResources as resource, i}
						<tr class="hover">
							<th>{i + 1}</th>
							<td class="truncate">{resource.subject}</td>
							<td class="truncate">{resource.title}</td>
							<td class="truncate">{resource.description}</td>
							<td class="truncate">{resource.filename}</td>
							<td class="truncate">{resource.linkId}</td>
							<td class="truncate">{resource.type}</td>
							<td class="truncate">{resource.url}</td>
							<td class="join">
								<a href="/admin/resources/{resource.uid}" class="btn btn-sm join-item">
									<PenSquare size={18} />
								</a>
								{#if busy}
									<span class="join-item">
										<span class="loading loading-spinner loading-sm" />
									</span>
								{:else}
									<ConfirmDialog
										title="Delete '{resource.uid}'?"
										message="Are you sure you want to delete this section '{resource.uid}'"
										on:click={() => onDelete(resource)}
									/>
								{/if}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>
