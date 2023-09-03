<script lang="ts">
	import { sections } from '$lib/stores/sections';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { afterNavigate, goto } from '$app/navigation';
	import { saveDocument } from '$lib/services/client/firebase/db';

	let code = '';
	let name = '';

	let codeInput: HTMLInputElement;
	let nameInput: HTMLInputElement;

	let section = $sections.find((s) => s.name === $page.params.name);

	let prevPath: string = '/admin/sections';

	onMount(() => {
		if (section) {
			code = section.uid ?? '';
			name = section.name;
			nameInput.focus();
		} else {
			codeInput.focus();
		}
	});

	afterNavigate((url) => {
		if (url.from?.url.pathname) prevPath = url.from?.url.pathname;
	});

	async function onSave() {
		await saveDocument<Section>('sections', { uid: code, name });
		goto(prevPath);
	}
</script>

<div class="flex flex-col px-4 md:px-8 pt-12">
	<div class="flex self-center flex-col gap-4 max-w-sm w-full bg-base-300 p-6 rounded-lg shadow-lg">
		<h1 class="text-xl font-semibold mb-4">
			{section ? `Edit '${section.name}''` : 'Add New Section'}
		</h1>
		<input
			type="text"
			class="input"
			bind:this={codeInput}
			disabled={!!section}
			placeholder="Section Code"
			bind:value={code}
		/>
		<input
			type="text"
			class="input"
			bind:this={nameInput}
			bind:value={name}
			placeholder="Section Name"
		/>
		<div class="flex gap-4 mt-4 justify-end">
			<a href={prevPath} class="btn btn-ghost">Cancel</a>
			<button class="btn btn-accent" on:click={onSave}>Save</button>
		</div>
	</div>
</div>
