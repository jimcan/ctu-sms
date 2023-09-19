import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals: { userSession } }) => {
	return { userSession };
}) satisfies LayoutServerLoad;
