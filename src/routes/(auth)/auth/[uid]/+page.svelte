<script lang="ts">
	import type { ChangeEventHandler } from 'svelte/elements.js';
	import { appState, setLoading, setState } from '$lib/stores/app-state';
	import { Baseline, ChevronsLeft, Hash, LogOut, PenSquare, Save, Users2, X } from 'lucide-svelte';
	import { updateDocument, signOut } from '$lib/services/client';
	import UpdateAvatar from './UpdateAvatar.svelte';
	import Avatar from '$lib/components/Avatar.svelte';
	import { sections as sectionsStore, subjects as subjectsStore } from '$lib/stores';
	import { getStudentStore } from '$lib/stores/students';

	export let data;

	setLoading(false);

	const studentStore = getStudentStore(data.userSession.uid);

	$: student = $studentStore;
	let sections = $sectionsStore;
	let subjects = $subjectsStore;

	let name = '';
	let idNumber = '';
	let sectionCode = '';
	let subjectCodes: string[] = [];

	$: inSubjectCodes = (uid: string) => subjectCodes?.includes(uid);

	let editing = false;

	$: student && setInitialValues();

	const setInitialValues = () => {
		name = student?.name ?? '';
		idNumber = student?.idNumber?.toString() ?? '';
		sectionCode = student?.sectionCode ?? '';
		subjectCodes = student?.subjectCodes ?? [];
	};

	const handleSubmit = async () => {
		setLoading(true);
		const err = await updateDocument<Student>('students', data.userSession.uid, {
			name,
			idNumber: Number(idNumber),
			sectionCode,
			subjectCodes
		});

		editing = false;
		setLoading(false);
	};

	const handleSubjectSelect: ChangeEventHandler<HTMLInputElement> = (e) => {
		if (e.currentTarget.checked) {
			console.log(e.currentTarget.value);

			subjectCodes.push(e.currentTarget.value);
		} else {
			subjectCodes = subjectCodes.filter((sc) => sc !== e.currentTarget.value);
		}
	};

	async function onSignOut() {
		setLoading(true);
		const error = await signOut();
		setLoading(false);

		if (error) setState(error);
	}
</script>

<main class="flex min-h-screen items-center justify-center p-4">
	<div
		class="grid md:grid-cols-2 max-w-sm md:max-w-none shadow-lg hover:drop-shadow-[0_0_4px_#3d98ff]"
	>
		<div
			class="flex flex-col rounded-none rounded-t-lg md:rounded-l-lg md:rounded-none items-center bg-gradient-to-br from-primary to-accent"
		>
			<div class="flex flex-col items-center p-8 gap-2 h-full justify-center">
				<div class="flex relative">
					<Avatar {student} size="4xl" outline="accent" />
					<UpdateAvatar photoUrl={student?.photoUrl} imgName="{sectionCode}/{name}" />
				</div>
				<p class="md text-lg text-center">{data.userSession.email}</p>
				<button class="btn btn-outline" on:click={onSignOut}><LogOut size={18} /> Sign out</button>
			</div>
		</div>
		<div
			class="flex flex-col bg-base-300 p-6 rounded-none rounded-b-lg md:rounded-none md:rounded-r-lg items-center h-full justify-center"
		>
			<form class="flex flex-col w-full items-center gap-4">
				<div class="flex relative w-full">
					<span class="absolute left-4 inset-y-0 z-10 flex items-center justify-center">
						<Baseline size={18} />
					</span>
					<input
						autocomplete="off"
						type="text"
						class="input w-full pl-12 pr-12"
						name="name"
						placeholder="Name"
						bind:value={name}
						disabled={!editing}
					/>
					<span class="absolute right-4 inset-y-0 z-10 flex items-center justify-center">
						{#if editing && name}
							<button
								type="button"
								class="btn btn-sm btn-ghost btn-circle"
								on:click={() => (name = '')}
							>
								<X />
							</button>
						{/if}
					</span>
				</div>
				<div class="flex relative w-full">
					<span class="absolute left-4 inset-y-0 z-10 flex items-center justify-center">
						<Hash size={18} />
					</span>
					<input
						type="number"
						class="input w-full pl-12 pr-12"
						name="idNumber"
						placeholder="ID Number"
						bind:value={idNumber}
						disabled={!editing}
					/>
					<span class="absolute right-4 inset-y-0 z-10 flex items-center justify-center">
						{#if editing && idNumber}
							<button
								type="button"
								class="btn btn-sm btn-ghost btn-circle"
								on:click={() => (idNumber = '')}
							>
								<X />
							</button>
						{/if}
					</span>
				</div>
				<div class="flex relative w-full">
					<span class="absolute left-4 inset-y-0 z-10 flex items-center justify-center">
						<Users2 size={18} />
					</span>
					<select
						class="select w-full pl-12"
						bind:value={sectionCode}
						name="sectionCode"
						placeholder="Section"
						disabled={!editing}
					>
						{#each sections as section}
							<option value={section.uid}>{section.name}</option>
						{/each}
					</select>
				</div>
				<div class={`rounded-lg p-4 w-full${editing ? ' bg-base-100' : ' bg-base-200'}`}>
					<p class="p-2">Select Subject/s</p>
					<div class="">
						{#each subjects as subject}
							<div class="flex">
								<input
									type="checkbox"
									disabled={!editing}
									checked={inSubjectCodes(subject.uid ?? '')}
									value={subject.uid}
									class="checkbox checkbox-sm mt-4"
									on:change={handleSubjectSelect}
								/>

								<div class="collapse rounded-md collapse-arrow">
									<input type="checkbox" />
									<div class="collapse-title">{subject.codeName}</div>
									<div class="collapse-content">
										<p>{subject.title}</p>
										{#if subject.description}
											<p>{subject.description}</p>
										{/if}
									</div>
								</div>
							</div>
						{/each}
					</div>
				</div>
				<div class="flex w-full gap-4 justify-evenly">
					<a href="/" class="btn btn-ghost sm:btn-md btn-sm" on:click={() => (editing = !editing)}>
						<ChevronsLeft size={18} /> Home
					</a>
					<button
						type="button"
						class="btn btn-ghost sm:btn-md btn-sm"
						on:click={() => {
							if (editing) setInitialValues();
							editing = !editing;
						}}
					>
						{#if editing}
							<X size={18} /> Cancel
						{:else}
							<PenSquare size={18} /> Update
						{/if}
					</button>
					<button
						class="btn btn-accent sm:btn-md btn-sm"
						disabled={!editing || $appState.loading}
						on:click={handleSubmit}
					>
						{#if $appState.loading}
							<Save size={18} /> Saving <span class="loading loading-dots loading-md" />
						{:else}
							<Save size={18} /> Save
						{/if}
					</button>
				</div>
			</form>
		</div>
	</div>
</main>
