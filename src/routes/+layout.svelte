<script lang="ts">
	import '../app.css';
	import type { LayoutData } from './$types';
	import { currentUid } from '$lib/stores';

	export let data: LayoutData;

	$: session = data.userSession;
	$: currentUid.set(session?.uid);
</script>

<slot />
