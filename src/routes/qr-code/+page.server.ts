import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals: { userSession } }) => {
	if (!userSession?.admin) throw redirect(303, '/');
}) satisfies PageServerLoad;
