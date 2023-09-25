import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from './config';
import { handleError } from '$lib/services/utils';
import type { FirebaseError } from 'firebase-admin';

export async function uploadFile(file: File, folders: string) {
	try {
		const fileRef = ref(storage, `${folders}/${file.name}`);
		await uploadBytes(fileRef, file);
		const url = await getDownloadURL(fileRef);
		return { url };
	} catch (e) {
		return { error: handleError(e) };
	}
}

export async function deleteFile(filename: string, folders: string) {
	try {
		const fileRef = ref(storage, `${folders}/${filename}`);
		await deleteObject(fileRef);
	} catch (e) {
		return handleError(e);
	}
}

export async function fileExists(filename: string, folders: string) {
	try {
		const fileRef = ref(storage, `${folders}/${filename}`);
		await getDownloadURL(fileRef);
		return true;
	} catch (e) {
		return (e as FirebaseError).code !== 'storage/object-not-found';
	}
}
