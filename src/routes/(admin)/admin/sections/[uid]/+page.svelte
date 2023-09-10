<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { afterNavigate, goto } from '$app/navigation';
	import { saveDocument } from '$lib/services/client/firebase/db';
	import { sections as sectionsStore } from '$lib/stores/sections';
	// import { schedules as schedulesStore } from '$lib/stores/schedules';
	// import { subjects as subjectsStore } from '$lib/stores';
	// import type { ChangeEventHandler } from 'svelte/elements';
	// import dayjs from 'dayjs';
	// import { dateStringToScheduleTime, timeFromSchedule } from '$lib/utils';

	// const scheduleDays: ScheduleDay[] = ['M', 'T', 'W', 'Th', 'F'];
	let sections = $sectionsStore;
	// let subjects = $subjectsStore;
	// let schedules = $schedulesStore;

	// let section = sections.at(0)?.uid;
	// let subject = subjects.at(0)?.uid;
	// let days: ScheduleDay[] = [];
	// let start = dayjs().format('HH:mm');
	// let end = dayjs().format('HH:mm');

	let name: string;

	let section = sections.find((s) => s.uid === $page.params.uid);

	let prevPath: string = '/admin/sections';

	onMount(() => {
		nameInput.focus();
		if (section) {
			name = section.name;
			// section = section.section;
			// subject = section.subject;
			// days = section.days;
			// start = timeFromSchedule(section.start).format('HH:mm');
			// end = timeFromSchedule(section.end).format('HH:mm');
		}
	});

	afterNavigate((url) => {
		if (url.from?.url.pathname) prevPath = url.from?.url.pathname;
	});

	// const onDaySelect: ChangeEventHandler<HTMLInputElement> = (e) => {
	// 	const checked = e.currentTarget.checked;
	// 	const value: ScheduleDay = e.currentTarget.value as ScheduleDay;

	// 	if (checked) {
	// 		days.push(value);
	// 	} else {
	// 		const i = days.indexOf(value);
	// 		if (i > -1) {
	// 			days.splice(i, 1);
	// 		}
	// 	}
	// };
	let nameInput: HTMLInputElement;

	async function onSave() {
		let sec: Section = {
			// days,
			// end: dateStringToScheduleTime(end),
			// section,
			// start: dateStringToScheduleTime(start),
			// subject,
			uid: name,
			name
		};

		// if (section) sec.uid = section.uid;

		await saveDocument<Section>('sections', sec);
		goto(prevPath);
	}
</script>

<div class="flex flex-col px-4 md:px-8 pt-12">
	<div class="flex self-center flex-col gap-4 max-w-sm w-full bg-base-300 p-6 rounded-lg shadow-lg">
		<h1 class="text-xl font-semibold mb-4">
			{section ? `Edit '${section.uid}'` : 'Add New Section'}
		</h1>
		<input
			type="text"
			class="input"
			bind:this={nameInput}
			bind:value={name}
			placeholder="Section Name"
		/>
		<!-- <select class="select">
			{#each sections as section}
				<option value={section.uid}>{section.name}</option>
			{/each}
		</select>
		<select class="select">
			{#each subjects as subject}
				<option value={subject.uid}>{subject.uid}</option>
			{/each}
		</select>
		<details class="collapse bg-base-100 collapse-arrow rounded-lg">
			<summary class="collapse-title">Days</summary>
			<div class="collapse-content">
				<div class="flex gap-2">
					{#each scheduleDays as d}
						<span class="flex items-center gap-2 justify-evenly">
							<input
								type="checkbox"
								name={d}
								class="checkbox checkbox-sm"
								value={d}
								on:change={onDaySelect}
							/>
							<label for={d}>{d}</label>
						</span>
					{/each}
				</div>
			</div>
		</details>
		<input type="time" class="input" bind:value={start} />
		<input type="time" class="input" bind:value={end} /> -->
		<div class="flex gap-4 mt-4 justify-end">
			<a href={prevPath} class="btn btn-ghost">Cancel</a>
			<button class="btn btn-accent" on:click={onSave}>Save</button>
		</div>
	</div>
</div>
