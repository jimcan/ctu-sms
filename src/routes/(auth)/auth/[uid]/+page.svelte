<script lang="ts">
	import type { ChangeEventHandler } from 'svelte/elements.js';
	import { Baseline, ChevronsLeft, Hash, LogOut, PenSquare, Save, Users2, X } from 'lucide-svelte';
	import { updateDocument, signOut } from '$lib/services/client';
	import UpdateAvatar from './UpdateAvatar.svelte';
	import { Avatar } from '$lib/components';
	import { LabeledInput } from '$lib/components/ui/labeled-input';
	import { LabeledSelect } from '$lib/components/ui/labeled-select';
	import { currentStudent, currentUid, sections, subjects } from '$lib/stores';

	export let data;

	$: secs = $sections;
	$: subs = $subjects;

	let subjectCodes: string[] = [];
	let editing = false;
	let fname = '';
	let lname = '';
	let idNumber = '';
	let sectionCode = '';

	let busy = false;
	$: {
		if (busy) {
			editing = false;
		}
	}

	$: student = $currentStudent;
	$: student, setInitialValues();

	const setInitialValues = () => {
		if (student) {
			fname = student.firstname ?? '';
			lname = student.lastname ?? '';
			idNumber = student.idNumber?.toString() ?? '';
			sectionCode = student.sectionCode ?? '';
			subjectCodes = student.subjectCodes ?? [];
		}
	};

	const handleSubmit = async () => {
		busy = true;

		await updateDocument<Student>('students', data.userSession.uid, {
			firstname: fname,
			lastname: lname,
			idNumber: Number(idNumber),
			sectionCode,
			subjectCodes
		});

		busy = false;

		editing = false;
	};

	const handleSubjectSelect: ChangeEventHandler<HTMLInputElement> = (e) => {
		if (e.currentTarget.checked) {
			subjectCodes.push(e.currentTarget.value);
		} else {
			subjectCodes = subjectCodes.filter((sc) => sc !== e.currentTarget.value);
		}
	};

	async function onSignOut() {
		busy = true;
		currentUid.set(null);
		await signOut();
		busy = false;
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
					<UpdateAvatar photoUrl={student?.photoUrl} imgName="{sectionCode}/{fname} {lname}" />
				</div>
				<p class="md text-lg text-center">{data.userSession.email}</p>
				<button class="btn btn-outline" on:click={onSignOut}><LogOut size={18} /> Sign out</button>
			</div>
		</div>
		<div
			class="flex flex-col bg-base-300 p-4 md:p8 rounded-none rounded-b-lg md:rounded-none md:rounded-r-lg items-center h-full justify-center"
		>
			<form class="flex flex-col w-full items-center">
				<LabeledInput disabled={!editing} bind:value={idNumber} label="ID Number">
					<Hash slot="prefix-icon" size={18} />
				</LabeledInput>
				<LabeledInput disabled={!editing} bind:value={fname} label="First Name">
					<Baseline slot="prefix-icon" size={18} />
				</LabeledInput>
				<LabeledInput disabled={!editing} bind:value={lname} label="Last Name">
					<Baseline slot="prefix-icon" size={18} />
				</LabeledInput>
				<LabeledSelect disabled={!editing} bind:value={sectionCode} label="Section">
					<Users2 slot="prefix-icon" size={18} />
					{#each secs as section}
						<option value={section.uid}>{section.name}</option>
					{/each}
				</LabeledSelect>
				<div class="form-control">
					<p class="label">Subjects</p>
					<div class={`rounded-lg px-4 w-full${editing ? ' bg-base-100' : ' bg-base-200'}`}>
						{#each subs as subject}
							<div class="flex">
								<input
									type="checkbox"
									disabled={!editing}
									checked={subjectCodes.includes(subject.uid ?? '')}
									value={subject.uid}
									class="checkbox checkbox-sm mt-4"
									on:change={handleSubjectSelect}
								/>
								<div class="collapse rounded-md collapse-arrow">
									<input type="checkbox" />
									<div class="collapse-title">{subject.uid}</div>
									<div class="collapse-content">
										<p>{subject.title}</p>
									</div>
								</div>
							</div>
						{/each}
					</div>
				</div>
				<div class="divider" />
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
						disabled={!editing}
						on:click={handleSubmit}
					>
						{#if busy}
							<Save size={18} /> Saving <span class="loading loading-dots loading-sm" />
						{:else}
							<Save size={18} /> Save
						{/if}
					</button>
				</div>
			</form>
		</div>
	</div>
</main>
