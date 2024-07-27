<script lang="ts">
	import type { Item } from 'rss-parser';
	export let post: Item;
</script>

<div class="flex flex-col gap-2 p-2">
	<a href={post.link} class="link-hover text-xl font-bold" target="_blank">
		{post.title}
	</a>
	<div class="italic">
		{post.creator} - {new Date(post.pubDate || post.isoDate).toLocaleDateString(undefined, {
			dateStyle: 'long'
		})}
	</div>
</div>
