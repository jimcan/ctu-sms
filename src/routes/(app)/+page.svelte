<script lang="ts">
	import AttendanceView from './AttendanceView.svelte';
	import dayjs from 'dayjs';
	import { DatePicker } from '$lib/components';

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
		<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
			<a href="/qr-scanner" class="btn">Scan Attendance</a>
			{#if data.userSession.admin}
				<a href="/qr-code" class="btn">QR Codes</a>
			{/if}

			<AttendanceView uid={data.userSession.uid} />
		</div>
	</div>
{/if}
