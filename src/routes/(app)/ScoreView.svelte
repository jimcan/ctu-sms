<script lang="ts">
	import { getScoresToView, toTitleCase } from '$lib/utils';
	import { EventListTile } from '$lib/components';
	import { scores as scoresStore, selectedDate } from '$lib/stores';

	$: scores = getScoresToView($scoresStore, $selectedDate.toDate());
</script>

<div class="flex flex-col gap-4 max-w-sm self-center w-full">
	{#each scores as score}
		<EventListTile type="score">
			<div class="flex gap-4">
				<strong>Subject :</strong>
				<p>{score.for}</p>
			</div>
			{#if score.no}
				<div class="flex gap-4">
					<strong>{toTitleCase(score.type)} # :</strong>
					<p>{score.no}</p>
				</div>
			{:else}
				<div class="flex gap-4">
					<strong>Type :</strong>
					<p>{toTitleCase(score.type)}</p>
				</div>
			{/if}
			<div class="flex gap-4">
				<strong>Score :</strong>
				<p>{`${score.value}/${score.perfect}`}</p>
			</div>
		</EventListTile>
	{/each}
</div>
