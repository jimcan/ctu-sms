<script lang="ts">
	import dayjs from 'dayjs';
	import { SkipBack, SkipForward } from 'lucide-svelte';
	import { cn } from '$lib/utils';
	import RollingDigit from './RollingDigit.svelte';
	import type { ChangeEventHandler } from 'svelte/elements';
	import { selectedDate } from '$lib/stores';

	let dateInput: HTMLInputElement;

	$: date = $selectedDate;

	$: d = date.get('date');
	$: m = date.get('month') + 1;
	$: y = date.get('year');

	function next() {
		selectedDate.set(date.add(1, 'day'));
	}

	function prev() {
		selectedDate.set(date.add(-1, 'day'));
	}

	const onDateInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
		date = dayjs(event.currentTarget.value);
	};
</script>

<div class={cn('flex flex-col items-center justify-center', 'gap-2 self-center max-w-sm w-full')}>
	<div class="flex gap-2 w-full">
		<button class="btn" on:click={prev} aria-label="Decrease the counter by one">
			<SkipBack size={18} />
		</button>
		<button on:click={() => dateInput.showPicker()} class="btn flex-1">
			<RollingDigit bind:value={m} />
			<span class="font-bold">-</span>
			<RollingDigit bind:value={d} />
			<span class="font-bold">-</span>
			<RollingDigit bind:value={y} />
		</button>
		<input
			class="hidden"
			type="date"
			bind:this={dateInput}
			value={date.format('YYYY-MM-DD')}
			on:change={onDateInputChange}
		/>
		<button class="btn" on:click={next} aria-label="Increase the counter by one">
			<SkipForward size={18} />
		</button>
	</div>
	{#if !dayjs().isSame(date, 'day')}
		<button class="btn w-full" on:click={() => selectedDate.set(dayjs())}>Today</button>
	{/if}
</div>
