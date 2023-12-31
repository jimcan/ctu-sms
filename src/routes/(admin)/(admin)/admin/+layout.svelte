<script lang="ts">
	import Select from './SectionSelect.svelte';

	import { db, signOut } from '$lib/services/client';
	import {
		CalendarCheck2,
		FileText,
		GanttChart,
		Home,
		LayoutDashboard,
		LogOut,
		Menu,
		Users2
	} from 'lucide-svelte';
	import { NavListTile, Avatar, AdminNav } from '$lib/components';
	import { onMount } from 'svelte';
	import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
	import { students, selectedUid, selectedSection, selectedSubject } from '$lib/stores/admin';
	import { currentSchedule, currentStudent, currentUid, sections, subjects } from '$lib/stores';
	import { goto } from '$app/navigation';

	export let data;

	let section = '';
	let subject = '';
	let checked = false;

	$: sectionUids = $sections.map((s) => s.uid ?? '');
	$: subjectUids = $subjects.map((s) => s.uid ?? '');

	$: selectedUid.set(data.userSession.uid);
	$: if (section) selectedSection.set(section);
	$: if (subject) selectedSubject.set(subject);
	$: if (!section) section = $currentSchedule?.section ?? $sections.at(0)?.uid ?? 'All';
	$: if (!subject) subject = $currentSchedule?.subject ?? $subjects.at(0)?.uid ?? '';

	onMount(() => {
		const cleanup = onSnapshot(query(collection(db, 'students'), orderBy('lastname')), (ss) => {
			students.set(ss.docs.map((d) => ({ ...d.data(), uid: d.id } as Student)));
		});

		return () => {
			cleanup();
		};
	});

	async function onSignOut() {
		currentUid.set(null);
		await signOut();
		goto('/');
	}
</script>

<div class="drawer lg:drawer-open min-h-[100dvh]">
	<input id="admin-drawer" bind:checked type="checkbox" class="drawer-toggle" />
	<div class="drawer-content flex flex-col">
		<div class="w-full max-w-[100dvw] navbar bg-base-300 border-b border-base-content">
			<div class="flex-none lg:hidden">
				<label for="admin-drawer" class="btn btn-square btn-ghost">
					<Menu />
				</label>
			</div>
			<AdminNav />
		</div>
		<div class="flex-1">
			<slot />
		</div>
		<div class="flex bg-base-300 sticky bottom-0 p-4 gap-4">
			<Select label="Section" bind:value={section} items={['All', ...sectionUids]} />
			<!-- <Select label="Section" bind:value={section} items={sectionUids} /> -->
			<Select label="Subject" bind:value={subject} items={subjectUids} />
		</div>
	</div>
	<div class="drawer-side">
		<label for="admin-drawer" class="drawer-overlay" />
		<div class="flex flex-col w-80 min-h-full bg-base-200">
			<div class="flex bg-gradient-to-br from-primary items-center justify-center to-accent w-full">
				<div class="flex flex-col items-center p-8 gap-2 h-full justify-center">
					<Avatar student={$currentStudent} size="2xl" outline="accent" />
					<p class="md text-lg text-center">{data.userSession.email}</p>
					<button class="btn btn-outline" on:click={onSignOut}>
						<LogOut size={18} /> Sign out
					</button>
				</div>
			</div>
			<ul class="p-4 flex flex-col flex-1">
				<NavListTile bind:checked title="Dashboard" to="/admin">
					<LayoutDashboard size={22} slot="icon" />
				</NavListTile>
				<div class="divider" />
				<NavListTile bind:checked title="Students" to="/admin/students">
					<Users2 size={22} slot="icon" />
				</NavListTile>
				<NavListTile bind:checked title="Sections" to="/admin/sections">
					<GanttChart size={22} slot="icon" />
				</NavListTile>
				<NavListTile bind:checked title="Subjects" to="/admin/subjects">
					<FileText size={22} slot="icon" />
				</NavListTile>
				<NavListTile bind:checked title="Schedules" to="/admin/schedules">
					<CalendarCheck2 size={22} slot="icon" />
				</NavListTile>
				<div class="flex-1" />
				<div class="divider" />
				<NavListTile bind:checked title="Home" to="/">
					<Home size={22} slot="icon" />
				</NavListTile>
			</ul>
		</div>
	</div>
</div>
