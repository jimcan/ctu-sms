<script lang="ts">
	import { page } from '$app/stores';
	import { hash } from '$lib/utils';
	import type { Dayjs } from 'dayjs';
	import dayjs from 'dayjs';
	import { onMount } from 'svelte';

	let subject = $page.url.searchParams.get('subject');
	let code = $page.params.code;
	let date: Dayjs;

	let hashedNow = '';

	let now = dayjs().format('YYYY-MM-DD');

	onMount(async () => (hashedNow = await hash(now)));
</script>

<p>{code}</p>
<p>{subject}</p>
<p>{code}</p>
<p>{hashedNow}</p>
{#if hashedNow === code}
	<p>Oh yeah</p>
{/if}
