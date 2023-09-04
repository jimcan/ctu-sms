<script lang="ts">
	import { Html5Qrcode } from 'html5-qrcode';
	import { onMount } from 'svelte';

	let scanning = false;

	let html5Qrcode: Html5Qrcode;

	onMount(init);

	function init() {
		html5Qrcode = new Html5Qrcode('reader');
	}

	onMount(() => {
		html5Qrcode.start(
			{ facingMode: 'environment' },
			{
				fps: 10,
				qrbox: { width: 250, height: 250 }
			},
			onScanSuccess,
			onScanFailure
		);
		scanning = true;
	});

	async function stop() {
		await html5Qrcode.stop();
		scanning = false;
	}

	function onScanSuccess(decodedText: any, decodedResult: any) {
		alert(`Code matched = ${decodedText}`);
		console.log(decodedResult);
	}

	function onScanFailure(error: any) {
		console.warn(`Code scan error = ${error}`);
	}
</script>

<main>
	<reader id="reader" />
	<!-- class="w-full min-h-[500px] bg-base-300" -->
	{#if scanning}
		<button on:click={stop}>stop</button>
		<!-- {:else}
		<button on:click={start}>start</button> -->
	{/if}
</main>

<style>
	reader {
		width: 100%;
		min-height: 500px;
		background-color: black;
	}
</style>
