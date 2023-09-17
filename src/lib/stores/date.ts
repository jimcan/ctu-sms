import dayjs, { Dayjs } from 'dayjs';
import { writable } from 'svelte/store';

export const date = writable<Dayjs>(dayjs());
