<script lang="ts">
	import { Trash2 } from 'lucide-svelte';

	export let title: string;
	export let message: string;

	let dialog: HTMLDialogElement;
</script>

<button class="btn btn-sm join-item" on:click={() => dialog.showModal()}>
	<Trash2 size={18} />
</button>
<dialog bind:this={dialog} class="modal">
	<form method="dialog" class="modal-box max-w-fit">
		<h3 class="font-bold text-lg">{title}</h3>
		<p class="py-4">{message}</p>
		<div class="modal-action">
			<!-- if there is a button in form, it will close the modal -->
			<button class="btn btn-ghost">Cancel</button>
			<button class="btn btn-accent" type="button" on:click>Delete</button>
		</div>
	</form>
</dialog>
