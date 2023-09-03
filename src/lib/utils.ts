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
