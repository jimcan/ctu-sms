import { decodeToken, exists, saveAsAdmin } from '$lib/services/server';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get('token') || '';
	const { decodedToken } = await decodeToken(token);

	if (decodedToken) {
		const { uid, name, email, picture } = decodedToken;
		event.locals.userSession = {
			uid,
			name,
			email,
			admin: email === 'jimcan051592@gmail.com' || email === 'jimcan009@gmail.com'
		};

		if (!(await exists('students', uid))) {
			await saveAsAdmin<Partial<Student>>('students', uid, { name, photoUrl: picture });
		}
	}

	return await resolve(event);
};
