<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { afterNavigate, goto } from '$app/navigation';
	import { saveDocument } from '$lib/services/client/firebase/db';
	import {
		schedules as schedulesStore,
		sections as sectionsStore,
		subjects as subjectsStore
	} from '$lib/stores';
	import type { ChangeEventHandler } from 'svelte/elements';
	import dayjs from 'dayjs';
	import { dateStringToScheduleTime, mwf, ssa, timeFromSchedule, tth } from '$lib/utils';

	let sections = $sectionsStore;
	let subjects = $subjectsStore;
	let schedules = $schedulesStore;

	let section = sections.at(0)?.uid;
	let subject = subjects.at(0)?.uid;
	let days: ScheduleDay[] = [];
	let room = '';
	let start = dayjs().format('HH:mm');
	let end = dayjs().format('HH:mm');

	let schedule = schedules.find((s) => s.uid === $page.params.uid);

	let prevPath: string = '/admin/schedules';

	onMount(() => {
		if (schedule) {
			section = schedule.section;
			subject = schedule.subject;
			days = schedule.days;
			room = schedule.room;
			start = timeFromSchedule(schedule.start).format('HH:mm');
			end = timeFromSchedule(schedule.end).format('HH:mm');
		}
	});

	afterNavigate((url) => {
		if (url.from?.url.pathname) prevPath = url.from?.url.pathname;
	});

	const onDaySelect: ChangeEventHandler<HTMLInputElement> = (e) => {
		const checked = e.currentTarget.checked;
		const value: ScheduleDay = e.currentTarget.value as ScheduleDay;

		if (checked) {
			days.push(value);
		} else {
			const i = days.indexOf(value);
			if (i > -1) {
				days.splice(i, 1);
			}
		}
	};

	async function onSave() {
		if (section && subject) {
			let sched: Schedule = {
				days,
				room,
				end: dateStringToScheduleTime(end),
				section,
				start: dateStringToScheduleTime(start),
				subject
			};

			if (schedule) sched.uid = schedule.uid;

			await saveDocument<Schedule>('schedules', sched);
			goto(prevPath);
		}
	}
</script>

<div class="flex flex-col p-4 md:p-8">
	<div class="flex self-center flex-col gap-4 max-w-sm w-full bg-base-300 p-6 rounded-lg shadow-lg">
		<h1 class="text-xl font-semibold mb-4">
			{schedule ? `Edit '${schedule.subject} - ${schedule.section}'` : 'Add New schedule'}
		</h1>
		<select class="select" bind:value={section}>
			{#each sections as section}
				<option value={section.uid}>{section.name}</option>
			{/each}
		</select>
		<select class="select" bind:value={subject}>
			{#each subjects as subject}
				<option value={subject.uid}>{subject.uid}</option>
			{/each}
		</select>
		<div class="flex flex-col gap-4 bg-base-100 p-3 rounded-lg">
			<div class="flex gap-2 justify-evenly">
				{#each mwf as d}
					<span class="flex items-center gap-2 justify-evenly">
						<input
							type="checkbox"
							name={d}
							class="checkbox checkbox-sm"
							checked={days.includes(d)}
							value={d}
							on:change={onDaySelect}
						/>
						<label for={d}>{d}</label>
					</span>
				{/each}
			</div>
			<div class="flex gap-2 justify-evenly">
				{#each tth as d}
					<span class="flex items-center gap-2 justify-evenly">
						<input
							type="checkbox"
							name={d}
							class="checkbox checkbox-sm"
							checked={days.includes(d)}
							value={d}
							on:change={onDaySelect}
						/>
						<label for={d}>{d}</label>
					</span>
				{/each}
			</div>
			<div class="flex gap-2 justify-evenly">
				{#each ssa as d}
					<span class="flex items-center gap-2 justify-evenly">
						<input
							type="checkbox"
							name={d}
							class="checkbox checkbox-sm"
							checked={days.includes(d)}
							value={d}
							on:change={onDaySelect}
						/>
						<label for={d}>{d}</label>
					</span>
				{/each}
			</div>
		</div>
		<input type="text" class="input" placeholder="Room" bind:value={room} />
		<input type="time" class="input" bind:value={start} />
		<input type="time" class="input" bind:value={end} />
		<div class="flex gap-4 mt-4 justify-end">
			<a href={prevPath} class="btn btn-ghost">Cancel</a>
			<button class="btn btn-accent" on:click={onSave}>Save</button>
		</div>
	</div>
</div>
