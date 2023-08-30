import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals: { userSession } }) => {
	if (userSession) throw redirect(300, '/auth');
	return { userSession };
}) satisfies PageServerLoad;
