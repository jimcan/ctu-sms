<script lang="ts">
	import '../app.css';
	import type { LayoutData } from './$types';
	import { attendance, currentUid, scores } from '$lib/stores';

	export let data: LayoutData;

	$: session = data.userSession;
	$: currentUid.set(session?.uid);

	$: attendance;
	$: scores;
</script>

<slot />
