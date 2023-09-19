import { scheduleInTime } from '$lib/utils';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { writable, type Readable, derived } from 'svelte/store';

export const isAdmin = writable<boolean>(false);
export const attendance = writable<Attendance[]>([]);
export const scores = writable<Score[]>([]);
export const sections = writable<Section[]>([]);
export const selectedDate = writable<Dayjs>(dayjs());
export const currentStudent = writable<Student | undefined>();
export const subjects = writable<Subject[]>([]);
export const schedules = writable<Schedule[]>([]);

export const currentSchedule: Readable<Schedule | undefined> = derived(
	schedules,
	(schedules, set) => {
		const interval = setInterval(() => {
			set(schedules.find((s) => scheduleInTime(s)));
		}, 1000);

		return () => clearInterval(interval);
	}
);
