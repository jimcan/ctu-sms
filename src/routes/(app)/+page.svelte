<script lang="ts">
	import AttendanceView from './AttendanceView.svelte';
	import dayjs from 'dayjs';
	import { DatePicker } from '$lib/components';
	import { QrCode, QrCodeIcon, ScanLine } from 'lucide-svelte';
	import QrScanner from '$lib/components/QRScanner.svelte';

	export let data;

	let date = dayjs();
</script>

{#if !data.userSession}
	<div class="flex flex-col flex-1 items-center justify-center">
		<h3 class="md:text-xl md:font-semibold">
			Please <a href="/auth" class="link link-accent link-hover">Sign In</a> to use this System.
		</h3>
	</div>
{:else}
	<div class="flex flex-col p-4 gap-8 md:p-8 max-w-screen-xl xl:px-0 self-center w-full">
		<DatePicker bind:selected={date} />
		<div class="flex flex-col gap-4">
			{#if data.userSession.admin}
				<a href="/qr-code" class="btn"><QrCode size={18} /> QR Codes</a>
			{:else}
				<a href="/qr-scanner" class="btn"><ScanLine size={18} />Scan Attendance</a>
			{/if}

			<AttendanceView uid={data.userSession.uid} bind:date />
		</div>
	</div>
{/if}
