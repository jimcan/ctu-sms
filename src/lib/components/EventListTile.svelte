<script lang="ts">
	import { cn, toTitleCase } from '$lib/utils';
	import { X } from 'lucide-svelte';

	export let type: 'attendance' | 'score' = 'attendance';
	export let onClose: VoidFunction | undefined = undefined;
</script>

<div
	class={cn(
		'flex',
		'bg-base-200',
		'rounded-lg',
		'max-w-sm w-full',
		'hover:drop-shadow-[0_0_4px_#3d98ff]'
	)}
>
	<div
		class={cn('flex items-center justify-center', 'w-10', 'rounded-l-lg', {
			'bg-accent/50': type === 'attendance',
			'bg-warning/50': type === 'score'
		})}
	>
		<p class="label">{toTitleCase(type)}</p>
	</div>
	<div class={cn('flex flex-1 flex-col justify-evenly gap-2', 'p-4')}>
		<slot />
	</div>
	{#if onClose}
		<div class="flex p-2">
			<button class="btn btn-sm btn-circle btn-ghost" on:click={onClose}><X size={18} /></button>
		</div>
	{/if}
</div>

<style>
	.label {
		writing-mode: vertical-rl;
		white-space: nowrap;
		letter-spacing: -1px;
		font-weight: 500;
		text-transform: uppercase;
		font-size: small;
	}
</style>
