<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { LabeledInput, LabeledSelect, Only, Select } from '$lib/components';
	import YoutubeVideo from '$lib/components/YoutubeVideo.svelte';
	import { saveDocument, upload } from '$lib/services/client';
	import { deleteFile, fileExists } from '$lib/services/client/firebase/storage';
	import { subjects } from '$lib/stores';
	import { selectedResources, selectedSubject } from '$lib/stores/admin';
	import { Save } from 'lucide-svelte';
	import { onMount } from 'svelte';

	let resource = $selectedResources.find((s) => s.uid === $page.params.uid);

	let fileInput: HTMLInputElement;

	let resourceType: AppResourceType = 'file';
	let title = '';
	let url = '';
	let linkId: string | undefined;
	let filename = '';
	let description = '';
	let subject = '';

	let files: FileList | undefined = undefined;

	let busy = false;

	$: {
		const a = url.trim().split('?').at(0);
		if (a) {
			const b = a.split('/').at(-1);
			if (b) linkId = b;
		}
	}

	$: if (files) {
		const file = files.item(0);

		if (file && !filename) {
			filename = file.name;
		}
	}

	onMount(() => {
		subject = $selectedSubject ?? '';
		if (resource) {
			title = resource.title;
			resourceType = resource.type;
			subject = resource.subject;
			description = resource.description ?? '';
			url = resource.url;
			linkId = resource.linkId;
		}
	});

	async function onUpload() {
		if (files) {
			const file = files.item(0);

			if (file) {
				const finalFile = new File([file], filename, { type: file.type });

				if (subject) {
					const folderName = `resources/${subject}`;

					const exists = await fileExists(
						resource?.filename ?? '',
						`resources/${resource?.subject}`
					);

					if (exists) await deleteFile(filename, folderName);

					const { url, error } = await upload(finalFile, folderName);
					console.error(error);
					console.log(url);

					return url;
				}
			}
		}
	}

	async function onSave() {
		if (!subject && !title && (!files || !linkId))
			return alert('Please provide title and/or choose a file or add a youtube link to proceed.');

		let r: AppResource = {
			subject: subject,
			title,
			url,
			type: resourceType,
			description,
			filename,
			uid: resource?.uid
		};

		busy = true;

		if (resourceType === 'file') {
			const downloadUrl = await onUpload();

			if (downloadUrl) {
				r.url = downloadUrl;

				console.table(r);

				const e = await saveDocument<AppResource>('resources', r);
				if (e) alert(e.message);
				goto('/admin/resources');
			}
		} else {
			r.linkId = linkId;
			await saveDocument<AppResource>('resources', r);
			goto('/admin/resources');
		}
		busy = false;
	}

	function reset() {
		title = '';
		url = '';
		linkId = '';
		filename = '';
		description = '';
		files = undefined;
	}
</script>

<div class="flex justify-center p-4">
	<div class="card w-full max-w-sm bg-base-300">
		<div class="card-body">
			<h2 class="card-title mb-4">Add New Resource</h2>
			<Select label="Subjects" bind:value={subject} items={$subjects.map((s) => s.uid ?? '')} />
			<Select
				label="Type"
				bind:value={resourceType}
				items={['file', 'link']}
				titleCase
				on:click={reset}
			/>
			<LabeledInput label="Title" placeholder="Title" bind:value={title} />
			{#if resourceType === 'link'}
				<LabeledInput label="URL" placeholder="Paste youtube link here." bind:value={url} />
			{/if}
			{#if linkId}
				<YoutubeVideo bind:linkId />
			{/if}
			{#if resourceType === 'file'}
				<div class="join mt-2">
					<button
						class="btn join-item"
						on:click={() => {
							fileInput.click();
						}}>Choose File</button
					>
					<input class="input join-item w-full" placeholder="No file choosen" value={filename} />
				</div>
				<input bind:files type="file" bind:this={fileInput} class="hidden" />
			{/if}
			<div class="form-control">
				<label for="desc" class="label">Description</label><textarea
					name="desc"
					class="textarea"
					bind:value={description}
				/>
			</div>
			<div class="card-actions mt-4 justify-end">
				<button class="btn btn-accent" on:click={onSave}>
					{#if busy}
						<Save size={18} />Saving <span class="loading loading-dots" />
					{:else}
						<Save size={18} />Save
					{/if}
				</button>
			</div>
		</div>
	</div>
</div>
