<script lang="ts">
	import dayjs from 'dayjs';
	import { cn, getAttendanceToView } from '$lib/utils';
	import { DatePicker } from '$lib/components';
	import { getAttendanceStore } from '$lib/stores/attendance.js';
	import QrScanner from '$lib/components/QRScanner.svelte';

	export let data;

	$: student = data.student;

	let date = dayjs();
	const attendanceStore = getAttendanceStore('jimcan');
	$: console.log($attendanceStore);

	$: attendanceToView = getAttendanceToView($attendanceStore, date.toDate());
</script>

{#if !student}
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
			<a href="/qr-code" class="btn">QR Codes</a>
			<div
				class={cn(
					'flex flex-col',
					'p-4',
					'bg-base-200',
					'rounded-lg',
					'hover:drop-shadow-[0_0_4px_#3d98ff] hover:bg-base-100'
				)}
			>
				{#each attendanceToView as attendance}
					<p>{attendance.owner}</p>
				{/each}
			</div>
			<div
				class={cn(
					'flex flex-col',
					'p-4',
					'bg-base-200',
					'rounded-lg',
					'hover:drop-shadow-[0_0_4px_#3d98ff] hover:bg-base-100'
				)}
			>
				hello
			</div>
			<div
				class={cn(
					'flex flex-col',
					'p-4',
					'bg-base-200',
					'rounded-lg',
					'hover:drop-shadow-[0_0_4px_#3d98ff] hover:bg-base-100'
				)}
			>
				hello
			</div>
			<div
				class={cn(
					'flex flex-col',
					'p-4',
					'bg-base-200',
					'rounded-lg',
					'hover:drop-shadow-[0_0_4px_#3d98ff] hover:bg-base-100'
				)}
			>
				hello
			</div>
			<div
				class={cn(
					'flex flex-col',
					'p-4',
					'bg-base-200',
					'rounded-lg',
					'hover:drop-shadow-[0_0_4px_#3d98ff] hover:bg-base-100'
				)}
			>
				hello
			</div>
			<div
				class={cn(
					'flex flex-col',
					'p-4',
					'bg-base-200',
					'rounded-lg',
					'hover:drop-shadow-[0_0_4px_#3d98ff] hover:bg-base-100'
				)}
			>
				hello
			</div>
			<div
				class={cn(
					'flex flex-col',
					'p-4',
					'bg-base-200',
					'rounded-lg',
					'hover:drop-shadow-[0_0_4px_#3d98ff] hover:bg-base-100'
				)}
			>
				hello
			</div>
			<div
				class={cn(
					'flex flex-col',
					'p-4',
					'bg-base-200',
					'rounded-lg',
					'hover:drop-shadow-[0_0_4px_#3d98ff] hover:bg-base-100'
				)}
			>
				hello
			</div>
			<div
				class={cn(
					'flex flex-col',
					'p-4',
					'bg-base-200',
					'rounded-lg',
					'hover:drop-shadow-[0_0_4px_#3d98ff] hover:bg-base-100'
				)}
			>
				hello
			</div>
		</div>
	</div>
{/if}
