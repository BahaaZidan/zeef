<script lang="ts">
	import PostCard from '$lib/components/PostCard.svelte';

	export let data;
</script>

{#each data.posts as post}
	<PostCard {post} />
{/each}
