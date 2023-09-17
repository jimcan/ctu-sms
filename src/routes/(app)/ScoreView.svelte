<script lang="ts">
	import { getScoresToView } from '$lib/utils';
	import { date } from '$lib/stores/date';
	import { currentScores } from '$lib/stores/my-details';
	import { EventListTile } from '$lib/components';

	$: scores = getScoresToView($currentScores, $date.toDate());
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
					<strong>{score.type} # :</strong>
					<p>{score.no}</p>
				</div>
			{:else}
				<div class="flex gap-4">
					<strong>Type :</strong>
					<p>{score.type}</p>
				</div>
			{/if}
			<div class="flex gap-4">
				<strong>Score :</strong>
				<p>{`${score.value}/${score.perfect}`}</p>
			</div>
		</EventListTile>
	{/each}
</div>
