import { writable } from 'svelte/store';

export const currentSelectedSubject = writable<string | undefined>();
