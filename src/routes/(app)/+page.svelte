<script lang="ts">
	import dayjs, { Dayjs } from 'dayjs';
	import RollingDigit from './RollingDigit.svelte';
	import { SkipBack, SkipForward } from 'lucide-svelte';

	export let data;

	let now: Dayjs = dayjs();

	$: value = now.format('YYYY-MM-DD');

	$: d = now.get('date');
	$: m = now.get('month') + 1;
	$: y = now.get('year');

	$: student = data.student;

	function next() {
		now = now.add(1, 'day');
		console.log(now);
	}

	function prev() {
		now = now.add(-1, 'day');
		console.log(now);
	}

	let ddd: HTMLInputElement;
</script>

{#if !student}
	<div class="flex flex-col flex-1 items-center justify-center">
		<h3 class="md:text-xl md:font-semibold">
			Please <a href="/auth" class="link link-accent link-hover">Sign In</a> to use this System.
		</h3>
	</div>
{:else}
	<div class="flex flex-col p-8">
		<div class="flex gap-2 self-center">
			<button class="btn" on:click={prev} aria-label="Decrease the counter by one">
				<SkipBack />
			</button>

			<button on:click={() => ddd.showPicker()} class="btn">
				<RollingDigit bind:value={m} />
				<span class="text-2xl font-bold">-</span>
				<RollingDigit bind:value={d} />
				<span class="text-2xl font-bold">-</span>
				<RollingDigit bind:value={y} />
			</button>

			<input class="hidden" type="date" bind:this={ddd} {value} />

			<button class="btn" on:click={next} aria-label="Increase the counter by one">
				<SkipForward />
			</button>
		</div>
	</div>
{/if}
