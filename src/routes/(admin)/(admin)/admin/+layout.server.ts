import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals: { userSession } }) => {
	if (!userSession?.admin) {
		throw redirect(303, '/auth');
	}

	return { userSession };
}) satisfies LayoutServerLoad;
