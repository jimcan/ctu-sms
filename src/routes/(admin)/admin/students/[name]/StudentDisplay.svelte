<script lang="ts">
	import { goto } from '$app/navigation';
	import { currentStudent, currentStudentUid, studentsBySection } from '$lib/stores/students';
	import { cn, toName } from '$lib/utils';
	import { SkipBack, SkipForward } from 'lucide-svelte';

	$: cs = $currentStudent;
	$: ci = cs?.index;
	$: ps = ci && ci > 0 ? $studentsBySection.at(ci - 1) : undefined;
	$: ns =
		typeof ci !== 'undefined' && ci < $studentsBySection.length - 1
			? $studentsBySection.at(ci + 1)
			: undefined;

	function onPrev() {
		if (ps) {
			currentStudentUid.set(ps.uid);
			goto(`/admin/students/${toName(ps?.firstname ?? '', ps?.lastname ?? '')}`);
		}
	}

	function onNext() {
		if (ns) {
			currentStudentUid.set(ns.uid);
			goto(`/admin/students/${toName(ns?.firstname ?? '', ns?.lastname ?? '')}`);
		}
	}
</script>

<div class="avatar mt-4">
	<div class="w-64 rounded">
		<img src={cs?.value?.photoUrl} alt="" />
	</div>
</div>
<div
	class={cn(
		'flex items-center',
		'bg-base-100',
		'w-full gap-2 p-2 mb-2 max-w-sm',
		'border border-base-200 rounded-2xl',
		'hover:drop-shadow-[0_0_4px_#3d98ff]'
	)}
>
	<button disabled={!ps} class="btn" on:click={onPrev}><SkipBack /></button>
	<div class="flex items-center justify-center bg-base-200 rounded-lg w-full h-full">
		<h1 class="text-xl font-semibold">
			{toName(cs?.value?.firstname ?? '', cs?.value?.lastname ?? '')}
		</h1>
	</div>
	<button disabled={!ns} class="btn" on:click={onNext}><SkipForward /></button>
</div>
