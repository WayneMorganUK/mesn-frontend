<script lang="ts">
	import { workouts, user } from '$lib/store';
	let title: string;
	let load: number | null;
	let reps: number | null;
	let error: string | null = null;
	let emptyFields: string | string[] = [];
	const handleSubmit = async () => {
		const workout = { title, load, reps };

		if ($user) {
			const token = $user.token;
			const response = await fetch('../../apis/addWorkout', {
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'POST',
				body: JSON.stringify({ workout, token })
			});
			const resp = await response.json();

			if (!response.ok) {
				error = resp.error;
				emptyFields = resp.emptyFields;
			}
			if (response.ok) {
				emptyFields = [];
				error = null;
				title = '';
				load = null;
				reps = null;
				if ($workouts) {
					$workouts = [{ ...resp }, ...$workouts];
				} else {
					$workouts = [{ ...resp }];
				}
			}
		} else {
			error = 'User does not exist';
		}
	};
</script>

<form class="create" on:submit|preventDefault={handleSubmit}>
	<h3>Add a New Workout</h3>

	<label for="title">Exercise Title:</label>
	<input
		type="text"
		on:change={() => title}
		bind:value={title}
		class={emptyFields.includes('title') ? 'error' : ''}
	/>

	<label for="load">Load (in kg):</label>
	<input
		type="number"
		on:change={() => load}
		bind:value={load}
		class={emptyFields.includes('load') ? 'error' : ''}
	/>

	<label for="reps"> Number of Reps: </label>

	<input
		type="number"
		on:change={() => reps}
		bind:value={reps}
		class={emptyFields.includes('reps') ? 'error' : ''}
	/>

	<button type="submit" on:submit|preventDefault>Add Workout</button>
	{#if error}
		<div class="error">{error}</div>
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
	div.error {
		padding: 10px;
		background: #ffefef;
		border: 1px solid var(--error);
		color: var(--error);
		border-radius: 4px;
		margin: 20px 0;
	}
	input.error {
		border: 1px solid var(--error);
		background: #ffefef;
	}
</style>
