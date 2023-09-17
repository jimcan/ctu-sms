<script lang="ts">
	import { themes } from '$lib/themes';
	import { cn } from '$lib/utils';
	import { Check, ChevronDown, Palette } from 'lucide-svelte';
	import { onMount } from 'svelte';

	let current_theme = 'dark';

	onMount(() => {
		if (typeof window !== 'undefined') {
			const theme = window.localStorage.getItem('theme');
			if (theme && themes.includes(theme)) {
				document.documentElement.setAttribute('data-theme', theme);
				current_theme = theme;
			}
		}
	});

	function setTheme(theme: string) {
		if (themes.includes(theme)) {
			const one_year = 60 * 60 * 24 * 365;
			window.localStorage.setItem('theme', theme);
			document.cookie = `theme=${theme}; max-age=${one_year}; path=/; SameSite=Lax`;
			document.documentElement.setAttribute('data-theme', theme);
			current_theme = theme;
		}
	}
</script>

<div class="dropdown dropdown-end">
	<button class="btn btn-outline btn-circle flex gap-4 flex-nowrap">
		<Palette />
	</button>
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<ul
		tabindex="0"
		class={cn(
			'dropdown-content',
			'bg-base-200 drop-shadow-2xl',
			'p-3 mt-4 min-w-[150px]',
			'rounded-2xl z-10',
			'border border-base-100/50'
		)}
	>
		<div class="flex flex-col overflow-y-auto max-h-80 rounded-lg gap-2">
			{#each themes as theme}
				<button
					data-theme={theme}
					class="btn flex bg-base-300 rounded-lg flex-nowrap w-full gap-2"
					on:click={() => setTheme(theme)}
				>
					<div class="flex w-2 h-1/2 rounded bg-primary" />
					<div class="flex w-2 h-1/2 rounded bg-secondary" />
					<div class="flex w-2 h-1/2 rounded bg-accent" />
					<div class="flex w-2 h-1/2 rounded bg-base-100" />
					<span class="flex-1 text-left m-2">{theme}</span>
					{#if current_theme === theme}
						<Check size={18} />
					{/if}
				</button>
			{/each}
		</div>
	</ul>
</div>
<!-- </div> -->
