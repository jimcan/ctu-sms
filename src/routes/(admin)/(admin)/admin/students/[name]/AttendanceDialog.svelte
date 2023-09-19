<script lang="ts">
	import { LabeledInput } from '$lib/components/ui/labeled-input';
	import { LabeledSelect } from '$lib/components/ui/labeled-select';
	import { saveDocument } from '$lib/services/client';
	import { subjects, selectedDate } from '$lib/stores';
	import { selectedSubject, selectedUid } from '$lib/stores/admin';
	import { cn, dateStringToScheduleTime } from '$lib/utils';
	import dayjs from 'dayjs';
	import { Timestamp } from 'firebase/firestore';

	let dialog: HTMLDialogElement;
	let reason = '';
	let time = dayjs().format('HH:mm');

	$: notToday = !dayjs().isSame($selectedDate, 'day');

	async function onAttendance() {
		if ($selectedUid && $selectedSubject) {
			const selected = $selectedDate;
			let buf = dayjs();

			if (notToday) {
				const st = dateStringToScheduleTime(time);
				buf = buf
					.set('year', selected.year())
					.set('month', selected.month())
					.set('date', selected.date())
					.set('hour', st.h)
					.set('minute', st.m)
					.set('second', 0);
			}

			await saveDocument<Attendance>('attendance', {
				for: $selectedSubject,
				owner: $selectedUid,
				time: Timestamp.fromDate(buf.toDate())
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
		{#if notToday}
			<LabeledInput
				type="time"
				class="input input-bordered"
				label="Time"
				bind:value={time}
				disableClearButton
			/>
		{/if}
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
