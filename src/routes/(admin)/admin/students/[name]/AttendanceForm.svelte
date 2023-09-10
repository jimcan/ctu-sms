<script lang="ts">
	import { saveDocument } from '$lib/services/client/firebase/db';
	import { cn } from '$lib/utils';
	import { Timestamp } from 'firebase/firestore';

	export let studentUid: string;

	async function onAttendance() {
		await saveDocument<Attendance>('attendance', {
			for: 'in',
			owner: studentUid,
			time: Timestamp.fromDate(new Date())
		});
	}
</script>

<div
	class={cn(
		'grid grid-cols-2',
		'gap-4 p-2',
		'bg-base-100',
		'w-full max-w-sm',
		'border border-base-200 rounded-2xl',
		'hover:drop-shadow-[0_0_4px_#3d98ff]'
	)}
>
	<button class="btn" on:click={onAttendance}>Present</button>
	<button class="btn">Excuse</button>
</div>
