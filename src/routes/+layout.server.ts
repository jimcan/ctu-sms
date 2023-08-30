import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals: { appError } }) => {
	return { appError };
}) satisfies LayoutServerLoad;
