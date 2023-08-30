import {
	GoogleAuthProvider,
	signInWithPopup,
	signOut as _signOut,
	signInWithRedirect
} from 'firebase/auth';
import { auth } from './config';
import { handleError } from '$lib/services/utils';

export async function signinWithGoogle(): Promise<AppError | undefined> {
	try {
		await signInWithRedirect(auth, new GoogleAuthProvider());
	} catch (e: any) {
		return handleError(e);
	}
}

export async function signOut() {
	try {
		await _signOut(auth);
	} catch (e: any) {
		return handleError(e);
	}
}
