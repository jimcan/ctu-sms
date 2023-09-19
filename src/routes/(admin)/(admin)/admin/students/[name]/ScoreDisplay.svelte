<script lang="ts">
	import EventListTile from '$lib/components/EventListTile.svelte';
	import { deleteDocument } from '$lib/services/client';
	import { selectedDate } from '$lib/stores';
	import { selectedScores } from '$lib/stores/admin';
	import { getScoresToView } from '$lib/utils';

	$: console.log($selectedScores);

	$: scoresToView = getScoresToView($selectedScores, $selectedDate.toDate());

	async function onDelete(uid?: string) {
		if (uid) await deleteDocument('scores', uid);
	}
</script>

{#each scoresToView as score}
	<EventListTile type="score" onClose={() => onDelete(score.uid)}>
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
