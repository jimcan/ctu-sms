<script lang="ts">
	import { Download } from 'lucide-svelte';
	import fileIcon from '$lib/images/file.png';
	import { Select, YoutubeVideo } from '$lib/components';
	import {
		currentSchedule,
		currentSubject,
		resources,
		subjects as subjectsStore
	} from '$lib/stores';

	let value: string;

	$: subjects = $subjectsStore.map((s) => s.uid ?? '');
	$: if (!$currentSubject) currentSubject.set($subjectsStore.at(0)?.uid ?? '');
	$: if (value) {
		currentSubject.set(value);
	} else {
		currentSubject.set($currentSchedule?.subject);
	}

	$: appResources = $resources;
</script>

<div class="flex flex-col gap-4 items-center w-full">
	<div class="flex justify-center p-4 bg-base-300 w-full">
		<Select label="Subject" bind:value items={subjects} />
	</div>
	{#each appResources as resource}
		<div class="card w-full max-w-sm bg-base-200">
			<div class="card-body">
				<h2 class="card-title">{resource.title}</h2>
				{#if resource.description}
					<p>{resource.description}</p>
				{/if}
				{#if resource.type === 'link'}
					{#if resource.linkId}
						<YoutubeVideo bind:linkId={resource.linkId} />
					{/if}
					<a class="link" href={resource.url}>{resource.url}</a>
				{/if}
				{#if resource.type === 'file'}
					<div class="flex items-center mt-2">
						<img class="bg-base-content p-2 rounded-lg mr-4 w-16" src={fileIcon} alt="" />
						<a href={resource.url} class="link">{resource.filename}</a>
					</div>
				{/if}
			</div>
		</div>
	{/each}
</div>
