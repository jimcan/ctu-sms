<script lang="ts">
	import dayjs, { Dayjs } from 'dayjs';
	import RollingDigit from './RollingDigit.svelte';
	import { SkipBack, SkipForward } from 'lucide-svelte';
	import { cn, getAttendanceToView } from '$lib/utils';
	import { Timestamp } from 'firebase/firestore';
	import { getDocsStore } from '$lib/services/client/firebase/db';

	export let data;

	let value = dayjs().format('YYYY-MM-DD');

	$: selected = dayjs(value).isValid() ? dayjs(value) : dayjs();

	$: d = selected.get('date');
	$: m = selected.get('month') + 1;
	$: y = selected.get('year');

	$: student = data.student;

	function next() {
		selected = selected.add(1, 'day');
	}

	function prev() {
		selected = selected.add(-1, 'day');
	}

	let dateInput: HTMLInputElement;

	let a: Attendance = { uid: '', log: 'in', owner: '', time: Timestamp.fromDate(new Date()) };

	const attendanceStore = getDocsStore<Attendance>('attendance');

	$: attendanceToView = getAttendanceToView($attendanceStore, selected.toDate());
</script>

{#if !student}
	<div class="flex flex-col flex-1 items-center justify-center">
		<h3 class="md:text-xl md:font-semibold">
			Please <a href="/auth" class="link link-accent link-hover">Sign In</a> to use this System.
		</h3>
	</div>
{:else}
	<div class="flex flex-col p-4 gap-8 md:p-8 max-w-screen-xl xl:px-0 self-center w-full">
		<div
			class={cn(
				'flex flex-col gap-2 self-center',
				'bg-base-100',
				'border border-base-200',
				'p-2 rounded-2xl',
				'hover:drop-shadow-[0_0_4px_#3d98ff]'
			)}
		>
			<div class="flex gap-2">
				<button class="btn" on:click={prev} aria-label="Decrease the counter by one">
					<SkipBack />
				</button>
				{#if !dayjs().isSame(selected, 'day')}
					<button class="btn text-lg hidden sm:inline-flex" on:click={() => (selected = dayjs())}>
						Today
					</button>
				{/if}
				<button on:click={() => dateInput.showPicker()} class="btn">
					<RollingDigit bind:value={m} />
					<span class="text-2xl font-bold">-</span>
					<RollingDigit bind:value={d} />
					<span class="text-2xl font-bold">-</span>
					<RollingDigit bind:value={y} />
				</button>
				<input class="hidden" type="date" bind:this={dateInput} bind:value />
				<button class="btn" on:click={next} aria-label="Increase the counter by one">
					<SkipForward />
				</button>
			</div>
			{#if !dayjs().isSame(selected, 'day')}
				<button class="btn text-lg sm:hidden" on:click={() => (selected = dayjs())}> Today </button>
			{/if}
		</div>
		<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
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
