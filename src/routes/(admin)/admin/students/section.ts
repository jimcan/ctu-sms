import { writable } from 'svelte/store';

export const currentSelectedSection = writable<string | undefined>();
