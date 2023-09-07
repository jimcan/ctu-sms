import type { Timestamp } from 'firebase/firestore';
import type { type } from 'os';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			userSession: UserSession | null;
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
		title: string;
	}

	interface Section {
		uid?: string;
		name: string;
	}

	interface Student {
		uid: string;
		idNumber?: number;
		firstname?: string;
		lastname?: string;
		photoUrl?: string;
		sectionCode?: string;
		subjectCodes: string[];
		attendanceIds: string[];
		scoreIds: string[];
	}

	interface Attendance {
		uid?: string;
		time: Timestamp;
		for: string;
		owner: string;
	}

	type ScoreTerm = 'midterm' | 'final';

	type ScoreFor = 'quiz' | 'assignment' | 'project' | 'participation';

	interface Score {
		uid?: string;
		time: Timestamp;
		term: Term;
		type: ScoreFor;
		subject: string;
		owner: string;
		no?: number;
		perfect: number;
		value: number;
	}
}

export {};
