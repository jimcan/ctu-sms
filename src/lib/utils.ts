import { clsx, type ClassValue } from 'clsx';
import dayjs from 'dayjs';
import type { Timestamp } from 'firebase/firestore';
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
