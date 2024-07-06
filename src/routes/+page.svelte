<script lang="ts">
	import { signIn } from '@auth/sveltekit/client';
</script>

<div>
	<div class="text-xl">ZEEF</div>
	<button on:click={signIn} class="btn">signIn</button>
</div>
