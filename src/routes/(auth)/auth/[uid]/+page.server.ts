import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals: { userSession }, params: { uid } }) => {
	if (!userSession) throw redirect(303, '/auth');
	if (userSession.uid !== uid) throw error(404, 'Not Found');

	return { userSession };
}) satisfies PageServerLoad;
