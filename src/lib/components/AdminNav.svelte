<script lang="ts">
	import { page } from '$app/stores';
	import { Folder, FolderOpen } from 'lucide-svelte';

	$: paths = $page.url.pathname.split('/').filter((pn) => pn.length > 0);
</script>

<div class="breadcrumbs px-2">
	<ul>
		{#each paths as path, i}
			{@const p = paths.slice(0, paths.indexOf(path) + 1).join('/')}
			<li>
				{#if paths.length === i + 1}
					<span class="flex gap-2 items-center capitalize">
						<FolderOpen size={18} />
						{path.replaceAll('%20', ' ')}
					</span>
				{:else}
					<a href={`/${p}`} class="flex gap-2 items-center capitalize">
						<Folder size={18} />
						{path.replaceAll('%20', ' ')}
					</a>
				{/if}
			</li>
		{/each}
	</ul>
</div>
