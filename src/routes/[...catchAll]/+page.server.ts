// WORKAROUND: This file only exists to catch 404 routes so the platform binding works properly in dev mode. It can be deleted when this bug is fixed: https://github.com/sveltejs/kit/issues/11996
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	error(404, { message: 'Not found' });
};
