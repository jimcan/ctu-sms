<script lang="ts">
	import DatePicker from '$lib/components/DatePicker.svelte';
	import { LabeledInput } from '$lib/components/ui/labeled-input';
	import { LabeledSelect } from '$lib/components/ui/labeled-select';
	import { saveDocument } from '$lib/services/client';
	import { currentStudentUid, subjects } from '$lib/stores';
	import { selectedSubject } from '$lib/stores/subjects';
	import { cn, toTitleCase } from '$lib/utils';
	import type { Dayjs } from 'dayjs';
	import { Timestamp } from 'firebase/firestore';

	let dialog: HTMLDialogElement;
	let date: Dayjs;

	const terms: ScoreTerm[] = ['midterm', 'final'];
	const types: ScoreFor[] = ['quiz', 'assignment', 'project', 'participation'];

	let term: ScoreTerm;
	let scoreFor: ScoreFor;
	let perfect = '100';
	let value = '';
	let no: string | undefined;

	async function onSave() {
		if ($currentStudentUid && $selectedSubject) {
			const score: Score = {
				owner: $currentStudentUid,
				perfect: Number(perfect),
				for: $selectedSubject,
				term,
				type: scoreFor,
				value: Number(value),
				no: Number(no),
				time: Timestamp.fromDate(new Date())
			};
			const err = await saveDocument<Score>('scores', score);

			console.log(err);
		}
	}
</script>

<button class="btn join-item w-full max-w-sm" on:click={() => dialog.showModal()}> Score </button>
<dialog bind:this={dialog} class="modal">
	<form method="dialog" class="modal-box flex flex-col gap-2 max-w-fit">
		<h3 class="font-bold text-lg">Score</h3>
		<div class="flex gap-2">
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

			<LabeledSelect label="Term" class="select-bordered" bind:value={term}>
				{#each terms as t}
					<option value={t}>{toTitleCase(t)}</option>
				{/each}
			</LabeledSelect>
		</div>
		<div class="flex gap-2">
			<LabeledSelect label="Type" class="select-bordered" bind:value={scoreFor}>
				{#each types as t}
					<option value={t}>{toTitleCase(t)}</option>
				{/each}
			</LabeledSelect>
			{#if scoreFor === 'quiz' || scoreFor === 'assignment'}
				<LabeledInput
					type="number"
					class="input-bordered"
					label="{toTitleCase(scoreFor)} #"
					bind:value={no}
				/>
			{/if}
		</div>
		<div class="flex gap-2">
			<LabeledInput type="number" class="input-bordered" label="Perfect" bind:value={perfect} />
			<LabeledInput type="number" class="input-bordered" label="Score" bind:value />
		</div>
		<div class="modal-action">
			<button class="btn btn-ghost">Cancel</button>
			<button class={cn('btn btn-accent')} on:click={onSave}> Save </button>
		</div>
	</form>
</dialog>
