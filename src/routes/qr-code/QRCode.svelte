<script lang="ts">
	import { hash } from '$lib/utils';
	import dayjs from 'dayjs';

	// @ts-ignore
	import QR from 'svelte-qr';
	export let text: string | undefined;
</script>

<div class="flex p-4" data-theme="light">
	<QR {text} />
</div>
