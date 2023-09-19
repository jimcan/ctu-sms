<script lang="ts">
	import { PenSquare } from 'lucide-svelte';
	import { cn, timeToDisplay } from '$lib/utils';
	import { deleteDocument } from '$lib/services/client/firebase/db';
	import { ConfirmDialog } from '$lib/components';
	import { schedules } from '$lib/stores';

	async function onDelete(uid?: string) {
		if (!uid) return;
		await deleteDocument('schedules', uid);
	}
</script>

<div class="flex flex-col justify-center items-center w-[100dvw] md:w-full">
	<div class={cn('flex justify-between items-center', 'bg-base-300', 'w-full', 'p-4 md:p-8')}>
		<h1 class="text-xl font-semibold">Schedules</h1>
		<a href="/admin/schedules/new" class="btn btn-outline">Add New Schedule</a>
	</div>
	<div class={cn('flex p-4 w-full justify-center', 'md:p-8')}>
		<div class="overflow-x-auto max-w-6xl w-full bg-base-300 rounded-lg shadow-lg p-2">
			<table class="table">
				<thead>
					<tr>
						<th />
						<th>Section</th>
						<th>Subject</th>
						<th>Days</th>
						<th>Room</th>
						<th>Start</th>
						<th>End</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{#each $schedules as schedule, i}
						<tr class="hover">
							<th>{i + 1}</th>
							<td class="truncate">{schedule.section}</td>
							<td class="truncate">{schedule.subject}</td>
							<td class="truncate">{schedule.days.join('')}</td>
							<td class="truncate">{schedule.room}</td>
							<td class="truncate">{timeToDisplay(schedule.start)}</td>
							<td class="truncate">{timeToDisplay(schedule.end)}</td>
							<td class="join">
								<a href="/admin/schedules/{schedule.uid}" class="btn btn-sm join-item">
									<PenSquare size={18} />
								</a>
								<ConfirmDialog
									title="Delete '{schedule.uid}'?"
									message="Are you sure you want to delete this section '{schedule.uid}'"
									on:click={() => onDelete(schedule.uid)}
								/>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>
