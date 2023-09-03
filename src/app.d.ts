import type { Timestamp } from 'firebase/firestore';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			userSession: UserSession | null;
			appError: AppError | null;
			sections: Section[];
			subjects: Subject[];
			student: Student | null;
			students: Student[] | null;
		}
		interface PageData {
			userSession?: UserSession | null;
			appError?: AppError | null;
		}
		// interface Platform {}
	}

	type AnyObject = Record<string, any>;

	interface AppError {
		code?: string;
		message: string;
	}

	interface UserSession {
		uid: string;
		name?: string;
		email?: string;
		admin: boolean;
	}

	type AppAlert = 'error' | 'warning' | 'info' | 'success';

	interface AppState {
		loading: boolean;
		error?: AppError | null;
		info?: string | null;
		success?: string | null;
		warning?: string | null;
	}

	interface Subject {
		uid?: string;
		codeName: string;
		title: string;
		description?: string;
	}

	interface Section {
		uid?: string;
		name: string;
	}

	interface Student {
		uid: string;
		idNumber?: number;
		name?: string;
		photoUrl?: string;
		sectionCode?: string;
		subjectCodes: string[];
		attendanceIds: string[];
		scoreIds: string[];
	}

	interface Attendance {
		uid: string;
		time: Timestamp;
		log: 'in' | 'out';
		owner: string;
	}
}

export {};
