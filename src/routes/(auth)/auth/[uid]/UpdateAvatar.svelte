<script lang="ts">
	import { page } from '$app/stores';
	import { Pen, Save, X } from 'lucide-svelte';
	import { upload, updateDocument } from '$lib/services/client';

	export let photoUrl = '';
	export let imgName = '';

	let dialog: HTMLDialogElement;
	let input: HTMLInputElement;
	let image: HTMLImageElement;

	let imgFile: File | null = null;

	let busy = false;

	function onChange() {
		if (input.files) {
			imgFile = input.files[0];

			if (imgFile) {
				const reader = new FileReader();

				reader.addEventListener('load', async () => {
					const result = reader.result?.toString();

					image.setAttribute('src', result ?? '');
				});
				reader.readAsDataURL(imgFile);
			}
		}
	}

	const onUpload = async () => {
		if (imgFile) {
			busy = true;

			const filename = `${imgName}.${imgFile.type.split('/')[1]}`;
			imgFile = new File([imgFile], filename, { type: imgFile.type });
			const { url } = await upload(imgFile);

			if (url) {
				const uid = $page.data.userSession?.uid;
				if (uid) {
					await updateDocument<Student>('students', uid, { photoUrl: url });
				}
			}

			busy = false;
		}

		dialog.close();
	};
</script>

<button
	class="btn btn-xs btn-ghost btn-circle absolute top-0 right-0"
	on:click={() => dialog.showModal()}
>
	<Pen size={18} />
</button>
<dialog bind:this={dialog} class="modal">
	<form class="modal-box max-w-max">
		<h3 class="font-bold text-lg mb-8">Update Avatar</h3>
		<div class="flex flex-col gap-4 items-center">
			<div class="avatar">
				<div class="rounded w-72">
					<img class="w-full object-contain" bind:this={image} src={photoUrl} alt="" />
				</div>
			</div>
			<input
				type="file"
				bind:this={input}
				class="file-input w-72"
				accept=".jpg, .jpeg, .png"
				on:change={onChange}
			/>
		</div>
		<div class="modal-action">
			<button class="btn btn-ghost" type="button" on:click={() => dialog.close()}>
				<X size={18} /> Close
			</button>
			<button class="btn btn-accent" on:click={onUpload} disabled={busy}>
				{#if busy}
					<Save size={18} /> Saving <span class="loading loading-dots loading-sm" />
				{:else}
					<Save size={18} /> Save
				{/if}
			</button>
		</div>
	</form>
	<form method="dialog" class="modal-backdrop">
		<button />
	</form>
</dialog>
