<script lang="ts">
	import { page } from '$app/stores';

	const code = $page.params.code;
	const subject = $page.url.searchParams.get('subject');
	const uid = $page.url.searchParams.get('uid');
</script>

<p>{code}</p>
<p>{subject}</p>
<p>{uid}</p>
{#if !uid}
	<p>Please use the CTU SMS scanner</p>
{/if}
