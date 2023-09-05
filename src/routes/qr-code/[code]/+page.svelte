<script lang="ts">
	import Confirm from './Confirm.svelte';

	import { page } from '$app/stores';
	import { isValid } from '$lib/utils';
	import { onMount } from 'svelte';
	import { AlertTriangle, ChevronsLeft } from 'lucide-svelte';

	const code = $page.params.code;
	const subject = $page.url.searchParams.get('subject');
	const uid = $page.url.searchParams.get('uid');

	let valid = false;

	onMount(async () => (valid = await isValid(code)));
</script>

<div class="flex items-center justify-center p-4 min-h-[100dvh]">
	<div class="flex flex-col gap-4 min-w-[200px]">
		{#if valid && uid && subject}
			<Confirm {uid} {subject} />
		{:else}
			<div class="italic text-warning flex gap-2">
				<AlertTriangle />
				<p class="">The QR Code is invalid!</p>
			</div>
		{/if}
		<a href={$page.url.origin} class="btn"><ChevronsLeft size={18} /> Back</a>
	</div>
</div>
