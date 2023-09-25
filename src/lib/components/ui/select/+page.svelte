<script lang="ts">
	import type { HTMLSelectAttributes } from 'svelte/elements';
	import { cn, toTitleCase } from '$lib/utils';
	import type { SelectEvents } from '.';

	type $$Props = HTMLSelectAttributes & { label: string; items: string[]; titleCase?: boolean };
	type $$Events = SelectEvents;

	let className: $$Props['class'] = undefined;
	export let value: $$Props['value'] = undefined;
	export { className as class };
	export let disabled: boolean | null | undefined = false;
	export let label: string;
	export let items: string[];
	export let titleCase = false;
</script>

<div class="form-control w-full max-w-sm">
	<label for="idNumber" class="label pt-1">{label}</label>
	<div class="flex relative w-full">
		<span class="absolute left-4 inset-y-0 z-10 flex items-center justify-center">
			<slot name="prefix-icon" />
		</span>
		<select
			class={cn('select w-full', className, { 'pl-12': $$slots['prefix-icon'] })}
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
		>
			{#each items as item}
				<option value={item}>{titleCase ? toTitleCase(item) : item}</option>
			{/each}
		</select>
	</div>
</div>
