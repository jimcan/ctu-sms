<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { afterNavigate, goto } from '$app/navigation';
	import { saveDocument } from '$lib/services/client/firebase/db';
	import { subjects } from '$lib/stores/subjects';

	let code = '';
	let title = '';

	let codeInput: HTMLInputElement;
	let titleTextarea: HTMLTextAreaElement;

	let subject = $subjects.find((s) => s.uid === $page.params.code);

	let prevPath = '/admin/subjects';

	onMount(() => {
		if (subject) {
			code = subject.uid ?? '';
			title = subject.title;
			titleTextarea.focus();
		} else {
			codeInput.focus();
		}
	});

	afterNavigate((url) => {
		if (url.from?.url.pathname) prevPath = url.from?.url.pathname;
	});

	async function onSave() {
		await saveDocument<Subject>('subjects', {
			uid: code,
			title
		});
		goto(prevPath);
	}
</script>

<div class="flex flex-col px-4 md:px-8 pt-12">
	<div class="flex self-center flex-col gap-4 max-w-sm w-full bg-base-300 p-6 rounded-lg shadow-lg">
		<h1 class="text-xl font-semibold mb-4">
			{subject ? `Edit '${subject.uid}''` : 'Add New Section'}
		</h1>
		<input
			type="text"
			class="input"
			bind:this={codeInput}
			disabled={!!subject}
			placeholder="Code"
			bind:value={code}
		/>
		<textarea class="textarea" bind:this={titleTextarea} bind:value={title} placeholder="Title" />
		<div class="flex gap-4 mt-4 justify-end">
			<a href={prevPath} class="btn btn-ghost">Cancel</a>
			<button class="btn btn-accent" on:click={onSave}>Save</button>
		</div>
	</div>
</div>
