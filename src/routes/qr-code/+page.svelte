<script lang="ts">
	// @ts-ignore
	import QRCode from 'qrcode';

	import DatePicker from '$lib/components/DatePicker.svelte';
	import dayjs from 'dayjs';
	import { hash } from '$lib/utils';
	import { currentSchedule, selectedDate, subjects } from '$lib/stores';

	let qrcode: HTMLImageElement;
	// let date = dayjs();
	let text: string | undefined = '';

	// $: subjects = $subjectsStore;
	$: subject = $currentSchedule?.subject ?? $subjects.at(0)?.uid;
	$: subject, $selectedDate, generate();

	const generateQR = async (text: string) => {
		try {
			qrcode.src = await QRCode.toDataURL(text);
		} catch (err: any) {
			return err.toString();
		}
	};

	async function generate() {
		const hashedNow = await hash($selectedDate.format('YYYY-MM-DD'));

		text = `/qr-code/${hashedNow}?subject=${subject}`;
		await generateQR(text);
	}
</script>

<div class="flex min-h-[100dvh] items-center justify-center p-4 sm:p-8">
	<div class="flex flex-col w-full items-center max-w-lg gap-4">
		<DatePicker />
		<select
			value={subject}
			class="select select-bordered w-full max-w-xs"
			on:change={(e) => (subject = e.currentTarget.value)}
		>
			{#each $subjects as sub}
				<option value={sub.uid}>{sub.uid}</option>
			{/each}
		</select>

		<img src="" alt="" class="max-w-lg w-full rounded-lg" bind:this={qrcode} />
		<a href="/" class="btn w-full max-w-xs">Back</a>
	</div>
</div>
