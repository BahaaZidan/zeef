<script>
	import '../../app.css';
	import MdiMenu from '~icons/mdi/menu';
	import MdiSearch from '~icons/mdi/search';
	import MdiNotificationsNone from '~icons/mdi/notifications-none';
	import { signOut } from '@auth/sveltekit/client';
</script>

<div class="navbar bg-base-100">
	<div class="navbar-start">
		<div class="dropdown">
			<div tabindex="0" role="button" class="btn btn-circle btn-ghost">
				<MdiMenu />
			</div>
			<ul class="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow">
				<li><a href="/about">About</a></li>
				<li><button on:click={() => signOut()}>Logout</button></li>
			</ul>
		</div>
	</div>
	<div class="navbar-center">
		<a class="btn btn-ghost font-sans text-2xl tracking-widest" href="/">zeef</a>
	</div>
	<div class="navbar-end">
		<button class="btn btn-circle btn-ghost">
			<MdiSearch />
		</button>
		<button class="btn btn-circle btn-ghost">
			<div class="indicator">
				<MdiNotificationsNone />
				<span class="badge indicator-item badge-primary badge-xs"></span>
			</div>
		</button>
	</div>
</div>

<slot></slot>
