<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { afterNavigate, goto } from '$app/navigation';
	import { saveDocument } from '$lib/services/client/firebase/db';
	import { sections as sectionsStore } from '$lib/stores';

	let sections = $sectionsStore;
	let name: string;
	let section = sections.find((s) => s.uid === $page.params.uid);
	let prevPath: string = '/admin/sections';

	onMount(() => {
		nameInput.focus();
		if (section) {
			name = section.name;
		}
	});

	afterNavigate((url) => {
		if (url.from?.url.pathname) prevPath = url.from?.url.pathname;
	});

	let nameInput: HTMLInputElement;

	async function onSave() {
		let sec: Section = {
			uid: name,
			name
		};

		await saveDocument<Section>('sections', sec);
		goto(prevPath);
	}
</script>

<div class="flex flex-col px-4 md:px-8 pt-12">
	<div class="flex self-center flex-col gap-4 max-w-sm w-full bg-base-300 p-6 rounded-lg shadow-lg">
		<h1 class="text-xl font-semibold mb-4">
			{section ? `Edit '${section.uid}'` : 'Add New Section'}
		</h1>
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
