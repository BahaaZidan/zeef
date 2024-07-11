import { signIn, providerMap } from '$lib/server/auth';
import type { Actions, PageServerLoad } from './$types';

export const actions = { default: signIn } satisfies Actions;

export const load: PageServerLoad = async () => {
	return {
		providerMap
	};
};
