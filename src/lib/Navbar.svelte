<script>
	import { user, currentPage } from '$lib/store';
	import { goto } from '$app/navigation';

	const handleClick = async () => {
		localStorage.removeItem('user');
		$user = null;
		goto('/login');
	};
</script>

<header>
	<div class="container">
		<a href="/">
			<h1>Workout Buddy, {currentPage}</h1>
		</a>
		<nav>
			{#if $user}
				<div>
					<span>{$user.email}</span>
					<button on:click={handleClick}>Log out</button>
				</div>
			{/if}
			{#if !$user}
				<div class="user">
					<a href="/login">
						<p class:disabled={$currentPage === '/login'}>Login</p>
					</a>
					<a href="/signup">
						<p class:disabled={$currentPage === '/signup'}>Sign up</p>
					</a>
				</div>
			{/if}
		</nav>
	</div>
</header>

<style>
	.disabled {
		display: none;
	}
	.user {
		display: flex;
	}
	header {
		background: #fff;
	}
	header .container {
		max-width: 1400px;
		margin: 0 auto;
		padding: 10px 20px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	header a {
		color: #333;
		text-decoration: none;
	}

	/* navbar */
	nav {
		display: flex;
		align-items: center;
	}
	a,
	button {
		margin-left: 10px;
	}
	button {
		background: #fff;
		color: var(--primary);
		border: 2px solid var(--primary);
		padding: 6px 10px;
		border-radius: 4px;
		font-family: 'Poppins';
		cursor: pointer;
		font-size: 1em;
	}
</style>
