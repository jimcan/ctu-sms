import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals: { userSession }, params: { uid } }) => {
	if (!userSession) throw redirect(303, '/auth');

	return { userSession };
}) satisfies PageServerLoad;
