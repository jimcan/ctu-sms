<script lang="ts">
	import QRCode from './QRCode.svelte';

	import DatePicker from '$lib/components/DatePicker.svelte';
	import { subjects as subjectsStore } from '$lib/stores/subjects';
	import dayjs from 'dayjs';
	import { onMount } from 'svelte';
	// @ts-ignore
	import QR from 'svelte-qr';

	// const QR = require('svelte-qr');
	// const bcrypt = require('bcrypt');

	$: subjects = $subjectsStore;
	let date = dayjs();
	let subject: string | undefined;
	let hashedText = '';
	let text: string | undefined;

	onMount(() => (subject = subjects.at(0)?.uid));

	async function onGenerate() {
		const d = date.format('YYYY-MM-DD');
		console.log(subject);

		console.log(d);

		const encoder = new TextEncoder();
		const data = encoder.encode(d);

		const buffer = await crypto.subtle.digest('SHA-1', data);
		const hashArray = Array.from(new Uint8Array(buffer));
		hashedText = hashArray.map((byte) => byte.toString(16).padStart(2, '0')).join('');
		text = `ctu-sms.vercel.app/qr-code/${hashedText}?subject=${subject}`;
	}
</script>

<div class="flex flex-col">
	<DatePicker bind:selected={date} />
	<select bind:value={subject} class="select select-bordered">
		{#each subjects as sub}
			<option value={sub.uid}>{sub.codeName}</option>
		{/each}
	</select>
	<h1>{hashedText}</h1>
	<button class="btn" on:click={onGenerate}>Generate</button>
	{#if text}
		<QRCode bind:text />
	{/if}
</div>
