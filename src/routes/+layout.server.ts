import { sources } from '$lib/sources';
import type { LayoutServerLoad } from './$types';
import Parser from 'rss-parser';

export const prerender = true;

export const load: LayoutServerLoad = async () => {
	const parser = new Parser();

	const posts = (
		await Promise.all(
			sources.map(async (src) => {
				const feed = await parser.parseURL(src);
				return feed.items.map((i) => ({ ...i, creator: i.creator || feed.title }));
			})
		)
	)
		.flat()
		.sort((a, b) => {
			const aDate = new Date(a.isoDate!);
			const bDate = new Date(b.isoDate!);
			if (bDate > aDate) return 1;
			if (bDate < aDate) return -1;
			return 0;
		});

	return { posts };
};
