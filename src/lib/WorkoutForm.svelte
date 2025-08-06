<script lang="ts">
	import { preventDefault, createBubbler } from 'svelte/legacy';

	const bubble = createBubbler();
	import { workouts, user } from '$lib/store';
	let title = $state();
	let load = $state();
	let reps = $state();
	let error: string | null = $state(null);
	let emptyFields: string | string[] = $state([]);

	let isSubmitting = $state(false);

	const handleSubmit = async () => {
		const workout = { title, load, reps };

		isSubmitting = true;
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
		isSubmitting = false;
	};
</script>

<form class="create" onsubmit={handleSubmit}>
	<h3>Add a New Workout</h3>

	<label for="title">Exercise Title:</label>
	<input
		type="text"
		onchange={() => title}
		bind:value={title}
		class={emptyFields.includes('title') ? 'error' : ''}
	/>

	<label for="load">Load (in kg):</label>
	<input
		type="number"
		onchange={() => load}
		bind:value={load}
		class={emptyFields.includes('load') ? 'error' : ''}
	/>

	<label for="reps"> Number of Reps: </label>

	<input
		type="number"
		onchange={() => reps}
		bind:value={reps}
		class={emptyFields.includes('reps') ? 'error' : ''}
	/>

	<button class:isSubmitting disabled={isSubmitting} type="submit" onsubmit={bubble('submit')}
		>Add Workout</button
	>

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
	.isSubmitting {
		background: grey;
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
