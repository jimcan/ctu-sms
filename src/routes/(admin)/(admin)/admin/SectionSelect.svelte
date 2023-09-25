<script lang="ts">
	let optionDialog: HTMLDialogElement;

	export let value: string;
	export let items: string[];
	export let label: string | undefined = undefined;

	function onSelect(item: string) {
		value = item;
	}
</script>

<div class="form-control w-full">
	{#if label}
		<label for="section" class="label">{label}</label>
	{/if}
	<button class="select truncate items-center" on:click={() => optionDialog.showModal()}>
		{value}
	</button>
</div>
<dialog bind:this={optionDialog} class="modal">
	<form
		method="dialog"
		class="modal-box flex flex-col w-fit px-0 py-2 min-w-[160px] rounded-lg border border-base-content/50"
	>
		{#each items as item}
			<button class="btn btn-ghost btn-sm rounded-none" on:click={() => onSelect(item)}>
				{item}
			</button>
		{/each}
	</form>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
