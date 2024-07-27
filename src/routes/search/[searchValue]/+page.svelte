<script lang="ts">
	import Fuse from 'fuse.js';
	import { page } from '$app/stores';
	import PostCard from '$lib/components/PostCard.svelte';

	export let data;

	const fuse = new Fuse(data.posts, {
		keys: ['title', 'link', 'content', 'contentSnippet'],
		threshold: 0.4
	});

	let result = fuse.search($page.params.searchValue);
</script>

{#each result as post}
	<PostCard post={post.item} />
{/each}
