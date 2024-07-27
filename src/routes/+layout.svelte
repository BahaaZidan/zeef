<script>
	import '../app.css';
	import MdiGithub from '~icons/mdi/github';
</script>

<div class="navbar bg-base-100">
	<div class="navbar-start">
		<a class="btn btn-ghost font-mono text-2xl font-bold tracking-widest" href="/">zeef.gg</a>
	</div>
	<div class="navbar-center">
		<div class="form-control">
			<input type="text" placeholder="Search" class="input input-bordered w-96" />
		</div>
	</div>
	<div class="navbar-end">
		<a class="btn btn-circle btn-ghost" href="https://github.com/BahaaZidan/zeef" target="_blank">
			<MdiGithub class="size-8" />
		</a>
	</div>
</div>

<slot></slot>
