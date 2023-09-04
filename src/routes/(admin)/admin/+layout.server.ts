import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { getDocsAsAdmin } from '$lib/services/server';

export const load = (async ({ locals: { userSession } }) => {
	if (!userSession?.admin) {
		throw redirect(303, '/auth');
	}

	return { userSession };
}) satisfies LayoutServerLoad;
