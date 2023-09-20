<script lang="ts">
	import AttendanceView from './AttendanceView.svelte';
	import { DatePicker } from '$lib/components';
	import { QrCode, ScanLine } from 'lucide-svelte';
	import ScoreView from './ScoreView.svelte';
	import { currentStudent } from '$lib/stores';

	export let data;

	$: isAdmin = data.userSession?.admin;
</script>

{#if $currentStudent}
	<div class="flex flex-col px-4 gap-4 pt-8 max-w-screen-xl xl:px-0 w-full self-center">
		<DatePicker />
		{#if isAdmin}
			<a href="/qr-code" class="btn max-w-sm self-center w-full"><QrCode size={18} /> QR Codes</a>
		{:else}
			<a href="/qr-scanner" class="btn max-w-sm self-center w-full">
				<ScanLine size={18} />Scan Attendance
			</a>
		{/if}
		<AttendanceView />
		<ScoreView />
	</div>
{:else if data.userSession && !$currentStudent}
	<div class="flex flex-col flex-1 items-center justify-center">
		<h3 class="md:text-xl md:font-semibold flex items-center gap-2">
			Loading data. Please wait
			<span class="loading loading-dots" />
		</h3>
	</div>
{:else}
	<div class="flex flex-col flex-1 items-center justify-center">
		<h3 class="md:text-xl md:font-semibold text-info">
			Please <a href="/auth" class="link link-accent link-hover">Sign In</a> to use this System.
		</h3>
	</div>
{/if}
