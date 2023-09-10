<script lang="ts">
	import { saveDocument } from '$lib/services/client';
	import { cn, toTitleCase } from '$lib/utils';
	import { Timestamp } from 'firebase/firestore';
	import { currentSelectedSubject } from '../subject';

	export let studentUid: string;

	const terms: ScoreTerm[] = ['midterm', 'final'];
	const types: ScoreFor[] = ['quiz', 'assignment', 'project', 'participation'];

	let term: ScoreTerm;
	let scoreFor: ScoreFor;
	let perfect = '100';
	let value = '';
	let no: string | undefined;

	async function onSave() {
		console.log($currentSelectedSubject);

		if ($currentSelectedSubject) {
			const score: Score = {
				owner: studentUid,
				perfect: Number(perfect),
				subject: $currentSelectedSubject,
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

<details
	class={cn(
		'collapse collapse-arrow',
		'bg-base-200',
		'max-w-sm w-full',
		'hover:drop-shadow-[0_0_4px_#3d98ff]'
	)}
>
	<summary class="collapse-title">Score</summary>
	<div class={cn('collapse-content', 'grid gap-2 grid-cols-2')}>
		<select class="select" bind:value={term}>
			{#each terms as t}
				<option value={t}>{toTitleCase(t)}</option>
			{/each}
		</select>
		<select class="select" bind:value={scoreFor}>
			{#each types as t}
				<option value={t}>{toTitleCase(t)}</option>
			{/each}
		</select>
		<input type="number" class="input" placeholder="Perfect" bind:value={perfect} />
		<input type="number" class="input" placeholder="Score" bind:value />
		{#if scoreFor === 'quiz' || scoreFor === 'assignment'}
			<input type="number" class="input" placeholder="{toTitleCase(scoreFor)} #" bind:value={no} />
		{/if}
		<button class="btn btn-accent" on:click={onSave}>Save</button>
	</div>
</details>
