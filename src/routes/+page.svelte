<script lang="ts">
	export let data;

	// $: console.log(data.posts);
</script>

{#each data.posts as post}
	<div class="flex flex-col gap-2 p-2">
		<a href={post.link} class="link-hover text-xl font-bold">
			{post.title}
		</a>
		<div>
			{post.creator} - {new Date(post.pubDate || post.isoDate).toLocaleDateString(undefined, {
				dateStyle: 'long'
			})}
		</div>
	</div>
{/each}
