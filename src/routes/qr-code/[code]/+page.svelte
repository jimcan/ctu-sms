<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	let subject = $page.url.searchParams.get('subject');
	let code = $page.params.code;
	console.log(code);
	console.log(subject);

	onMount(() => {});
</script>

qr code
