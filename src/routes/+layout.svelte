<script>
	import { page } from '$app/stores';
	import '../app.css';
	import MdiGithub from '~icons/mdi/github';
	import MdiSearch from '~icons/mdi/search';

	let searchValue = $page.url.pathname.includes('/search/')
		? decodeURI($page.url.pathname.split('/')[2])
		: '';
	function handleSearch() {
		if (searchValue) window.location.href = `/search/${searchValue}`;
	}
</script>

<div class="navbar bg-base-100">
	<div class="navbar-start">
		<a class="btn btn-ghost font-mono text-2xl font-bold" href="/">zeef.gg</a>
	</div>
	<div class="navbar-center">
		<div class="join">
			<input
				type="text"
				placeholder="Search"
				class="input input-bordered w-96"
				bind:value={searchValue}
				on:keypress={(e) => {
					if (e.key === 'Enter') handleSearch();
				}}
			/>
			<button class="btn join-item btn-neutral" on:click={handleSearch}>
				<MdiSearch />
			</button>
		</div>
	</div>
	<div class="navbar-end">
		<a class="btn btn-ghost" href="https://github.com/BahaaZidan/zeef" target="_blank">
			<MdiGithub class="size-8" />
		</a>
	</div>
</div>

<slot></slot>
