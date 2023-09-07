<script lang="ts">
	import { getScoresStore } from '$lib/stores/scores';
	import { cn, getAttendanceToView, getScoresToView } from '$lib/utils';
	import type { Dayjs } from 'dayjs';
	import dayjs from 'dayjs';

	export let studentId: string;

	let date: Dayjs;

	$: scoresStore = getScoresStore(studentId);
	$: scoresToView = getScoresToView($scoresStore, date?.toDate());
</script>

{#each scoresToView as score}
	<div
		class={cn(
			'flex flex-col',
			'bg-base-100',
			'p-2 mt-2',
			'border border-base-200 rounded-lg',
			'hover:drop-shadow-[0_0_4px_#3d98ff]'
		)}
	>
		<h4 class="font-semibold mb-2">Score</h4>
		<div class="flex flex-col sm:flex-row gap-2">
			<h2>Time:</h2>
			<p>{dayjs(score.time.toDate()).format('hh:mm A')}</p>
		</div>
	</div>
{/each}
