<script lang="ts">
	import { SignIn } from '@auth/sveltekit/components';

	export let data;
</script>

<div>
	<div>
		<h2>
			<span>Company Z</span>
		</h2>
		<div>
			{#each data.providerMap as provider}
				<SignIn provider={provider.id} signInPage="login" className="w-full">
					<div slot="submitButton">
						<span>
							Signin with {provider.name}
						</span>
					</div>
				</SignIn>
			{/each}
		</div>
	</div>
</div>
