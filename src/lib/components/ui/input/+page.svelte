<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils';
	import type { InputEvents } from '.';
	import { X } from 'lucide-svelte';

	type $$Props = HTMLInputAttributes;
	type $$Events = InputEvents;

	let className: $$Props['class'] = undefined;
	export let value: $$Props['value'] = undefined;
	export { className as class };
	export let disabled: boolean | null | undefined = false;
</script>

<div class="flex relative w-full">
	<span class="absolute left-4 inset-y-0 z-10 flex items-center justify-center">
		<slot name="prefix-icon" />
	</span>
	<input
		class={cn('input w-full pr-12', className, { 'pl-12': $$slots['prefix-icon'] })}
		bind:value
		{disabled}
		on:blur
		on:change
		on:click
		on:focus
		on:keydown
		on:keypress
		on:keyup
		on:mouseover
		on:mouseenter
		on:mouseleave
		on:paste
		on:input
		{...$$restProps}
	/>
	<span class="absolute right-4 inset-y-0 z-10 flex items-center justify-center">
		{#if !disabled && value}
			<button type="button" class="btn btn-sm btn-ghost btn-circle" on:click={() => (value = '')}>
				<X />
			</button>
		{/if}
	</span>
</div>
