<script lang="ts">
	import { afterNavigate, goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { Html5Qrcode } from 'html5-qrcode';
	import { X } from 'lucide-svelte';
	import { onMount } from 'svelte';

	let busy = false;
	let html5Qrcode: Html5Qrcode;
	let from = '/';

	afterNavigate((url) => (from = url.from?.url.pathname ?? '/'));
	onMount(init);

	function init() {
		html5Qrcode = new Html5Qrcode('reader');
		html5Qrcode.start(
			{ facingMode: 'environment' },
			{
				fps: 10,
				qrbox: { width: 250, height: 250 }
			},
			onScanSuccess,
			onScanFailure
		);
	}
	console.log(busy);
	async function stop() {
		busy = true;

		await html5Qrcode.stop();
		goto(from);
		busy = false;
	}

	function onScanSuccess(decodedText: any, decodedResult: any) {
		const link = `${decodedText}&uid=${$page.data.userSession?.uid}`;
		goto(link);
	}

	function onScanFailure(error: any) {
		console.warn(`Code scan error = ${error}`);
	}
</script>

<main class="flex justify-center items-center min-h-[100dvh] p-4">
	<div class="flex flex-col w-full h-full">
		<reader id="reader" />
		<button on:click={stop} class="btn mt-4">
			{#if busy}
				Stopping <span class="loading loading-dots loading-md" />
			{:else}
				<X size={18} />Cancel
			{/if}
		</button>
	</div>
</main>

<style>
</style>
