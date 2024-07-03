<script>
	import '../app.css';

	let { children } = $props();
</script>

<div class="navbar bg-base-100 flex-col justify-center">
	<a class="btn btn-ghost font-sans text-4xl font-semibold tracking-widest" href="/">ZEEF</a>
	<ul class="menu menu-horizontal px-1">
		<li><a>Signup</a></li>
		<li><a>Login</a></li>
		<li>
			<details>
				<summary> Parent </summary>
				<ul class="bg-base-100 rounded-t-none p-2">
					<li><a>Link 1</a></li>
					<li><a>Link 2</a></li>
				</ul>
			</details>
		</li>
	</ul>
</div>

{@render children()}
