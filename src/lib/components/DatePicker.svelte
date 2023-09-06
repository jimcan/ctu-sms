<script lang="ts">
	import dayjs from 'dayjs';
	import { SkipBack, SkipForward } from 'lucide-svelte';
	import { cn } from '$lib/utils';
	import RollingDigit from './RollingDigit.svelte';
	import type { ChangeEventHandler } from 'svelte/elements';

	let dateInput: HTMLInputElement;

	export let selected = dayjs();

	$: d = selected.get('date');
	$: m = selected.get('month') + 1;
	$: y = selected.get('year');

	function next() {
		selected = selected.add(1, 'day');
	}

	function prev() {
		selected = selected.add(-1, 'day');
	}

	const onDateInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
		selected = dayjs(event.currentTarget.value);
	};
</script>

<div
	class={cn(
		'flex flex-col gap-2',
		'bg-base-100',
		'border border-base-200',
		'rounded-2xl',
		'hover:drop-shadow-[0_0_4px_#3d98ff]'
	)}
>
	<div class="flex gap-2">
		<button class="btn" on:click={prev} aria-label="Decrease the counter by one">
			<SkipBack />
		</button>
		{#if !dayjs().isSame(selected, 'day')}
			<button class="btn text-lg hidden sm:inline-flex" on:click={() => (selected = dayjs())}>
				Today
			</button>
		{/if}
		<button on:click={() => dateInput.showPicker()} class="btn">
			<RollingDigit bind:value={m} />
			<span class="text-2xl font-bold">-</span>
			<RollingDigit bind:value={d} />
			<span class="text-2xl font-bold">-</span>
			<RollingDigit bind:value={y} />
		</button>
		<input
			class="hidden"
			type="date"
			bind:this={dateInput}
			value={selected.format('YYYY-MM-DD')}
			on:change={onDateInputChange}
		/>
		<button class="btn" on:click={next} aria-label="Increase the counter by one">
			<SkipForward />
		</button>
	</div>
	{#if !dayjs().isSame(selected, 'day')}
		<button class="btn text-lg sm:hidden" on:click={() => (selected = dayjs())}> Today </button>
	{/if}
</div>
