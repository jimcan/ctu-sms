import type { PageServerLoad } from './$types';

export const load = (async ({ locals: { userSession } }) => {
	return { userSession };
}) satisfies PageServerLoad;
