import { decodeToken, exists, saveAsAdmin } from '$lib/services/server';
import { themes } from '$lib/themes';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get('token') || '';
	const theme = event.cookies.get('theme');
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

	if (!theme || !themes.includes(theme)) {
		return await resolve(event);
	}

	return await resolve(event, {
		transformPageChunk: ({ html }) => {
			return html.replace('data-theme=""', `data-theme="${theme}"`);
		}
	});
};
