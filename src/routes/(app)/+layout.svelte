<script lang="ts">
	import { page } from '$app/stores';
	import { Theme } from '$lib/components';
	import Avatar from '$lib/components/Avatar.svelte';
	import { currentStudent } from '$lib/stores';
	import { cn } from '$lib/utils.js';
	import { FileIcon, FilesIcon, Folders, UserCog2 } from 'lucide-svelte';

	export let data;

	$: isAdmin = data.userSession?.admin;
</script>

<div class="flex flex-col min-h-[100dvh]">
	<div class="flex w-full" />
	<div class="flex justify-center w-full bg-base-200 border-b border-base-content">
		<div class="navbar max-w-screen-xl">
			<div class="navbar-start">
				<a
					class={cn('btn btn-ghost normal-case hover:bg-transparent text-xl', {
						'btn-active': $page.url.pathname === '/'
					})}
					href="/">CTU SMS</a
				>
			</div>
			<div class="navbar-end pr-2 sm:pr-6 xl:pr-0 gap-4">
				<a
					href="/files"
					class={cn('btn btn-outline btn-circle btn-ghost', {
						'btn-active': $page.url.pathname === '/files'
					})}
				>
					<Folders />
				</a>
				<Theme />
				{#if isAdmin}
					<a href="/admin" class="btn btn-outline btn-circle btn-ghost">
						<UserCog2 />
					</a>
				{/if}
				<a href="/auth" class="btn btn-ghost btn-circle">
					<Avatar student={$currentStudent} outline="accent" />
				</a>
			</div>
		</div>
	</div>
	<slot />
</div>
