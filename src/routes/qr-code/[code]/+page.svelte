<script lang="ts">
	import Confirm from './Confirm.svelte';

	import { page } from '$app/stores';
	import { getAttendanceStore } from '$lib/stores/attendance';

	const code = $page.params.code;
	const subject = $page.url.searchParams.get('subject');
	const uid = $page.url.searchParams.get('uid');
</script>

<p>{code}</p>
<p>{subject}</p>
<p>{uid}</p>
{#if uid && subject}
	<Confirm {uid} {subject} />
{:else}
	<p>Please use the CTU SMS scanner</p>
{/if}
