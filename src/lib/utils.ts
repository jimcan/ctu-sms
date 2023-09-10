import { clsx, type ClassValue } from 'clsx';
import dayjs, { Dayjs } from 'dayjs';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getInitials(name: string) {
	const parts = name.split(' ');
	let initials = '';

	for (const p of parts) {
		if (p.length > 0 && p !== '') {
			initials += p[0];
		}
	}

	return initials === '' ? undefined : initials;
}

export function modulo(n: number, m: number) {
	return ((n % m) + m) % m;
}

export function getAttendanceToView(all: Attendance[], date: Date) {
	return all.filter((a) => dayjs(a.time.toDate()).isSame(date, 'day'));
}

export function getScoresToView(all: Score[], date: Date) {
	return all.filter((s) => dayjs(s.time.toDate()).isSame(date, 'day'));
}

export async function hash(text: string) {
	const encoder = new TextEncoder();
	const data = encoder.encode(text);

	const buffer = await crypto.subtle.digest('SHA-1', data);
	const hashArray = Array.from(new Uint8Array(buffer));
	return hashArray.map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

export async function isValid(code: string) {
	if (!code) return false;
	const now = dayjs().format('YYYY-MM-DD');
	return (await hash(now)) === code;
}

export function displayDate(date: Date, format: string = 'YYYY-MM-DD') {
	return dayjs(date).format(format);
}

export function displayTime(date: Date, format: string = 'hh:mm A') {
	return dayjs(date).format(format);
}

export function toTitleCase(text?: string) {
	if (!text) return;
	return text
		.trim()
		.split(' ')
		.map((t) => t.at(0)?.toUpperCase() + t.slice(1).toLowerCase())
		.join(' ');
}

export function toName(fname?: string, lname?: string) {
	return `${toTitleCase(lname)}, ${toTitleCase(fname)}`;
}

export function fromName(name: string) {
	const s = name.split(' ');
	const lname = s.pop();

	return {
		fname: s.join(' '),
		lname
	};
}

export function timeFromSchedule(time: ScheduleTime) {
	let date = dayjs();
	date = date.set('s', 0);
	date = date.set('m', time.m);
	date = date.set('h', time.h);

	return date;
}

export function dateToScheduleTime(date: Dayjs): ScheduleTime {
	const h = date.hour();
	const m = date.minute();

	return { h, m };
}

export function dateStringToScheduleTime(date: string): ScheduleTime {
	const [t, a] = date.split(' ');
	const [sh, sm] = t.split(':');

	let h = Number(sh);
	const m = Number(sm);

	if (a === 'pm') {
		h += 12;
	}

	return { h, m };
}

export function timeToDisplay(time: ScheduleTime) {
	const date = timeFromSchedule(time);

	return date.format('hh:mm A');
}

export const scheduleDays: ScheduleDay[] = ['S', 'M', 'T', 'W', 'Th', 'F', 'Sa'];
export const mwf: ScheduleDay[] = [scheduleDays[1], scheduleDays[3], scheduleDays[5]];
export const tth: ScheduleDay[] = [scheduleDays[2], scheduleDays[4]];
export const ssa: ScheduleDay[] = [scheduleDays[0], scheduleDays[6]];

export function scheduleInTime(time: Schedule) {
	const start = timeFromSchedule(time.start);
	const end = timeFromSchedule(time.end);
	const now = dayjs();
	const inDays = time.days.includes(scheduleDays[now.day()] as ScheduleDay);

	return inDays ? now.isAfter(start) && now.isBefore(end) : false;
}
