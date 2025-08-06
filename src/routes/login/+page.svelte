<!-- @migration-task Error while migrating Svelte code: Imports of `svelte/internal/*` are forbidden. It contains private runtime code which is subject to change without notice. If you're importing from `svelte/internal/*` to work around a limitation of Svelte, please open an issue at https://github.com/sveltejs/svelte and explain your use case
https://svelte.dev/e/import_svelte_internal_forbidden -->
<script lang="ts">
	// import { preventDefault } from 'svelte/legacy';

	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { user, currentPage } from '$lib/store';
	import { page } from '$app/stores';

	$currentPage = $page.url.pathname;
	let email: string = $state('');
	let password: string = $state('');
	let loginError: string = $state('');
	onMount(async () => {
		const _user = localStorage.getItem('user');
		if (_user) {
			goto('/');
		}
	});
	const handleSubmit = async () => {
		const response = await fetch('./apis/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password })
		});
		console.log(response);

		if (response.status !== 500) {
			const resp = await response.json();
			if (response.status === 200) {
				$user = resp;
				localStorage.setItem('user', JSON.stringify(resp));
				goto('/');
			} else {
				loginError = resp.error;
			}
		} else {
			loginError = 'Connection Failed';
		}
	};
</script>

<form class="login" onsubmit={handleSubmit}>
	<h3>Log In</h3>

	<label for="email">Email address:</label>
	<input
		class="email"
		type="email"
		onchange={() => email}
		bind:value={email}
		required
		oninvalid={() => (loginError = 'Please enter a valid email address')}
	/>
	<label for="password">Password:</label>
	<input class="password" type="password" onchange={() => password} bind:value={password} />

	<button>Log in</button>
	{#if loginError}
		<div class="error">{loginError}</div>
	{/if}
</form>

<style>
	label,
	input {
		display: block;
	}
	input {
		padding: 10px;
		margin-top: 10px;
		margin-bottom: 20px;
		width: 100%;
		border: 1px solid #ddd;
		border-radius: 4px;
		box-sizing: border-box;
	}
	form button {
		background: var(--primary);
		border: 0;
		color: #fff;
		padding: 10px;
		font-family: 'Poppins';
		border-radius: 4px;
		cursor: pointer;
	}
	form.login {
		max-width: 400px;
		margin: 40px auto;
		padding: 20px;
		background: #fff;
		border-radius: 4px;
	}
	div.error {
		padding: 10px;
		background: #ffefef;
		border: 1px solid var(--error);
		color: var(--error);
		border-radius: 4px;
		margin: 20px 0;
	}
</style>
