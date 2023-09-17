<script lang="ts">
	import AttendanceView from './AttendanceView.svelte';
	import { DatePicker } from '$lib/components';
	import { QrCode, ScanLine } from 'lucide-svelte';
	import ScoreView from './ScoreView.svelte';

	export let data;
</script>

{#if data.userSession?.uid}
	<div class="flex flex-col px-4 gap-4 pt-8 max-w-screen-xl xl:px-0 w-full self-center">
		<DatePicker />
		{#if data.userSession?.admin}
			<a href="/qr-code" class="btn max-w-sm self-center w-full"><QrCode size={18} /> QR Codes</a>
		{:else}
			<a href="/qr-scanner" class="btn max-w-sm self-center w-full">
				<ScanLine size={18} />Scan Attendance
			</a>
		{/if}
		<AttendanceView />
		<ScoreView />
	</div>
{:else}
	<div class="flex flex-col flex-1 items-center justify-center">
		<h3 class="md:text-xl md:font-semibold">
			Please <a href="/auth" class="link link-accent link-hover">Sign In</a> to use this System.
		</h3>
	</div>
{/if}
