<script lang="ts">
	import { Theme } from '$lib/components';
	import Avatar from '$lib/components/Avatar.svelte';
	import { appState, clearState } from '$lib/stores/app-state.js';
	import { currentUid, currentStudent } from '$lib/stores/my-details.js';
	import { cn } from '$lib/utils.js';
	import {
		AlertTriangle,
		CheckCircle2,
		Info,
		LogIn,
		UserCog2,
		Users2,
		X,
		XCircle
	} from 'lucide-svelte';
	import { onMount } from 'svelte';

	export let data;

	onMount(() => {
		currentUid.set(data.userSession?.uid);
	});

	$: student = $currentStudent;
	$: isAdmin = data.userSession?.admin;
</script>

<div class="flex flex-col min-h-[100dvh]">
	<div class="flex w-full">
		{#if $appState.error}
			<div class="alert alert-error rounded-none">
				<XCircle />
				<div class="flex gap-4 items-center">
					{#if $appState.error?.code}
						<span class="whitespace-nowrap font-bold">{$appState.error?.code}:</span>
					{/if}
					<span>{$appState.error?.message}</span>
				</div>
				<button class="btn btn-sm btn-circle btn-ghost" on:click={() => clearState()}><X /></button>
			</div>
		{/if}
		{#if $appState.warning}
			<div class="alert alert-warning rounded-none">
				<AlertTriangle />
				<div class="flex">
					<span>{$appState.warning}</span>
				</div>
				<button class="btn btn-sm btn-circle btn-ghost" on:click={() => clearState('warning')}>
					<X />
				</button>
			</div>
		{/if}
		{#if $appState.info}
			<div class="alert alert-info rounded-none">
				<Info />
				<div class="flex">
					<span>{$appState.info}</span>
				</div>
				<button class="btn btn-sm btn-circle btn-ghost" on:click={() => clearState('info')}>
					<X />
				</button>
			</div>
		{/if}
		{#if $appState.success}
			<div class="alert alert-success rounded-none">
				<CheckCircle2 />
				<div class="flex">
					<span>{$appState.success}</span>
				</div>
				<button class="btn btn-sm btn-circle btn-ghost" on:click={() => clearState('success')}>
					<X />
				</button>
			</div>
		{/if}
		{#if $appState.loading}
			<progress class="progress rounded-none progress-accent h-5" />
		{/if}
	</div>
	<div class="flex justify-center w-full bg-base-200 border-b border-base-content">
		<div class="navbar max-w-screen-xl">
			<div class="navbar-start">
				<a class="btn btn-ghost normal-case hover:bg-transparent text-xl" href="/">CTU SMS</a>
			</div>
			<div class="navbar-end pr-2 sm:pr-6 xl:pr-0 gap-4">
				<Theme />

				{#if isAdmin}
					<a href="/admin" class="btn btn-outline btn-circle btn-ghost">
						<UserCog2 />
					</a>
				{/if}
				<a href="/auth" class="btn btn-ghost btn-circle">
					<Avatar {student} outline="accent" />
				</a>
			</div>
		</div>
	</div>
	<slot />
</div>
