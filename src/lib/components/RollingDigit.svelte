<script lang="ts">
	import { spring } from 'svelte/motion';
	import { cn, modulo } from '$lib/utils';

	export let value: number;
	export let fontSize: string = 'text-lg';

	const count = spring();
	$: count.set(value);
	$: offset = modulo($count, 1);

	const cls = 'flex w-full h-full items-center justify-center';
</script>

<div class={cn('overflow-hidden', fontSize)}>
	<div class="relative" style="transform: translate(0, {100 * offset}%)">
		<span class={cn(cls, 'absolute -top-full select-none')} aria-hidden="true">
			{Math.floor($count + 1)
				.toString()
				.padStart(2, '0')}
		</span>
		<span class={cls}>
			{Math.floor($count).toString().padStart(2, '0')}
		</span>
	</div>
</div>
