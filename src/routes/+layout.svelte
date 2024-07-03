<script>
	import '../app.css';

	let { children } = $props();
</script>

<div class="navbar flex-col justify-center bg-base-100">
	<a class="btn btn-ghost font-sans text-4xl font-semibold tracking-widest" href="/">ZEEF</a>
	<ul class="menu menu-horizontal px-1">
		<li><a href="/signup">Signup</a></li>
		<li><a href="/login">Login</a></li>
		<li>
			<details>
				<summary> Parent </summary>
				<ul class="rounded-t-none bg-base-100 p-2">
					<li><a>Link 1</a></li>
					<li><a>Link 2</a></li>
				</ul>
			</details>
		</li>
	</ul>
</div>

{@render children()}
