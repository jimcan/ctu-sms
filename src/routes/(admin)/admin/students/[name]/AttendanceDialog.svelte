<script lang="ts">
	import { DatePicker } from '$lib/components';
	import { LabeledInput } from '$lib/components/ui/labeled-input';
	import { LabeledSelect } from '$lib/components/ui/labeled-select';
	import { saveDocument } from '$lib/services/client';
	import { currentStudentUid, subjects } from '$lib/stores';
	import { selectedSubject } from '$lib/stores/subjects';
	import { cn } from '$lib/utils';
	import type { Dayjs } from 'dayjs';
	import { Timestamp } from 'firebase/firestore';

	let dialog: HTMLDialogElement;
	let reason = '';
	let date: Dayjs;

	async function onAttendance() {
		if ($currentStudentUid && $selectedSubject) {
			await saveDocument<Attendance>('attendance', {
				for: $selectedSubject,
				owner: $currentStudentUid,
				time: Timestamp.fromDate(new Date())
			});
		}
	}
</script>

<button class="btn join-item w-full max-w-sm" on:click={() => dialog.showModal()}>
	Attendance
</button>
<dialog bind:this={dialog} class="modal">
	<form method="dialog" class="modal-box flex flex-col gap-2 max-w-fit">
		<h3 class="font-bold text-lg">Attendance</h3>
		<LabeledSelect
			label="Subject"
			class="select-bordered"
			value={$selectedSubject}
			on:change={(e) => selectedSubject.set(e.currentTarget.value)}
		>
			{#each $subjects as sub}
				<option value={sub.uid}>{sub.uid}</option>
			{/each}
		</LabeledSelect>
		<LabeledInput label="Reason" bind:value={reason} class="input-bordered" />
		<div class="modal-action">
			<button class="btn btn-ghost">Cancel</button>
			<button class={cn('btn btn-accent', { 'btn-warning': !!reason })} on:click={onAttendance}>
				{reason ? 'Excuse' : 'Present'}
			</button>
		</div>
	</form>
</dialog>
