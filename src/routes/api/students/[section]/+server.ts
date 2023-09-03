import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { studentsBySection } from '$lib/services/server/firebase';

export const GET: RequestHandler = async ({ params }) => {
	const { docs: students } = await studentsBySection(params.section);

	return json(students);
};
