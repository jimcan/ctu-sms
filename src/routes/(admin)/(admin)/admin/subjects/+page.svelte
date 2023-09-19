<script lang="ts">
	import { PenSquare } from 'lucide-svelte';
	import { cn } from '$lib/utils';
	import { deleteDocument } from '$lib/services/client/firebase/db';
	import { subjects } from '$lib/stores';
	import { ConfirmDialog } from '$lib/components';

	async function onDelete(uid?: string) {
		if (!uid) return;
		await deleteDocument('subjects', uid);
	}
</script>

<div class="flex flex-col justify-center items-center w-[100dvw] md:w-full">
	<div class={cn('flex justify-between items-center', 'bg-base-300', 'w-full', 'p-4 md:p-8')}>
		<h1 class="text-xl font-semibold">Subjects</h1>
		<a href="/admin/subjects/new" class="btn btn-outline">Add New Subject</a>
	</div>
	<div class={cn('flex p-4 w-full justify-center', 'md:p-8')}>
		<div class="overflow-x-auto max-w-6xl w-full bg-base-300 rounded-lg shadow-lg p-2">
			<table class="table">
				<thead class="text-lg">
					<tr>
						<th />
						<th>Code</th>
						<th>Title</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{#each $subjects as subject, i}
						<tr class="hover">
							<th>{i + 1}</th>
							<td>{subject.uid}</td>
							<td>{subject.title}</td>
							<td class="join">
								<a href="/admin/subjects/{subject.uid}" class="btn btn-sm join-item">
									<PenSquare size={18} />
								</a>
								<ConfirmDialog
									title="Delete '{subject.uid}'?"
									message="Are you sure you want to delete this subject '{subject.uid}'"
									on:click={() => onDelete(subject.uid)}
								/>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>
