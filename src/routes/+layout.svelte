<script lang="ts">
	import '../app.css';
	import { setState } from '$lib/stores/app-state';
	import { onMount } from 'svelte';
	import { currentSchedule } from '$lib/stores/schedules';

	export let data;

	onMount(() => {
		if (data.appError) setState(data.appError);
	});
</script>

<slot />
