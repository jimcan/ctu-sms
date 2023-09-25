<script lang="ts">
	export let when = false;
</script>

{#if when}
	<slot />
{/if}
