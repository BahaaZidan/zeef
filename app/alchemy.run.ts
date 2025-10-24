import alchemy from 'alchemy';
import { SvelteKit } from 'alchemy/cloudflare';

const app = await alchemy('zeef-app');

export const worker = await SvelteKit('website');

console.log({
	url: worker.url
});

await app.finalize();
