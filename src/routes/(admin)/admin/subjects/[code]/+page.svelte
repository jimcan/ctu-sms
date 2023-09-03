<script lang="ts">
	import { sections } from '$lib/stores/sections';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { afterNavigate, goto } from '$app/navigation';
	import { saveDocument } from '$lib/services/client/firebase/db';
	import { subjects } from '$lib/stores/subjects';

	let code = '';
	let codeName = '';
	let title = '';
	let description: string | undefined;

	let codeInput: HTMLInputElement;
	let nameInput: HTMLInputElement;

	let subject = $subjects.find((s) => s.codeName === $page.params.code);

	let prevPath: string = '/admin/subjects';

	onMount(() => {
		if (subject) {
			code = subject.uid ?? '';
			codeName = subject.codeName;
			title = subject.title;
			description = subject.description;
			nameInput.focus();
		} else {
			codeInput.focus();
		}
	});

	afterNavigate((url) => {
		if (url.from?.url.pathname) prevPath = url.from?.url.pathname;
	});

	async function onSave() {
		await saveDocument<Subject>('subjects', { uid: code, codeName, title, description });
		goto(prevPath);
	}
</script>

<div class="flex flex-col px-4 md:px-8 pt-12">
	<div class="flex self-center flex-col gap-4 max-w-sm w-full bg-base-300 p-6 rounded-lg shadow-lg">
		<h1 class="text-xl font-semibold mb-4">
			{subject ? `Edit '${subject.codeName}''` : 'Add New Section'}
		</h1>
		<input
			type="text"
			class="input"
			bind:this={codeInput}
			disabled={!!subject}
			placeholder="Code"
			bind:value={code}
		/>
		<input
			type="text"
			class="input"
			bind:this={nameInput}
			bind:value={codeName}
			placeholder="Code Name"
		/>
		<textarea class="textarea" bind:value={title} placeholder="Title" />
		<textarea class="textarea" bind:value={description} placeholder="Description" />
		<div class="flex gap-4 mt-4 justify-end">
			<a href={prevPath} class="btn btn-ghost">Cancel</a>
			<button class="btn btn-accent" on:click={onSave}>Save</button>
		</div>
	</div>
</div>
