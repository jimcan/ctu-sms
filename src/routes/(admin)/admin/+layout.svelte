<script lang="ts">
	import { signOut } from '$lib/services/client';
	import { setLoading, setState } from '$lib/stores/app-state';
	import {
		CalendarCheck,
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
	import { getDocument } from '$lib/services/client/firebase/db.js';
	import { currentSchedule } from '$lib/stores/schedules.js';
	import { sections, selectedSection } from '$lib/stores/sections.js';
	import { selectedSubject, subjects } from '$lib/stores/subjects.js';
	import { currentStudent } from '$lib/stores/my-details.js';
	import { goto } from '$app/navigation';

	export let data;

	let student = $currentStudent;
	let checked = false;

	onMount(async () => {
		if (!student) goto('/');

		selectedSection.set($currentSchedule?.section ?? 'All');
		selectedSubject.set($currentSchedule?.subject ?? $subjects[0].uid);
	});

	async function onSignOut() {
		await signOut();
	}
</script>

<div class="drawer lg:drawer-open">
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
		<slot />
	</div>
	<div class="drawer-side">
		<label for="admin-drawer" class="drawer-overlay" />
		<div class="flex flex-col w-80 min-h-full bg-base-200">
			<div class="flex bg-gradient-to-br from-primary items-center justify-center to-accent w-full">
				<div class="flex flex-col items-center p-8 gap-2 h-full justify-center">
					<Avatar {student} size="2xl" outline="accent" />
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
