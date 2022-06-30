<script lang="ts">
	import { workouts } from './store';
	import { flip } from 'svelte/animate';
	import { fly, fade } from 'svelte/transition';

	const URI = import.meta.env.VITE_MONGODB_URI;

	const handleClick = async (id: Number) => {
		const response = await fetch(URI + '/' + id, {
			method: 'DELETE'
		});
		const json = await response.json();
		console.log('Deleted', json._id);

		if (response.ok) {
			$workouts = $workouts.filter((item) => item._id != id);
		}
	};
</script>

{#each $workouts as workout (workout._id)}
	<div
		class="workout-details"
		animate:flip
		in:fly={{ x: -800, duration: 2000, delay: 600 }}
		out:fade
	>
		<h4>{workout.title}</h4>
		<p><strong>Load (kg): </strong>{workout.load}</p>
		<p><strong>Number of reps: </strong>{workout.reps}</p>
		<p>{workout.createdAt}</p>
		<button on:click={() => handleClick(workout._id)}>Delete</button>
	</div>
{/each}

<style>
	.workout-details {
		background: #fff;
		border-radius: 4px;
		border: 1px solid #828282;
		margin: 20px auto;
		padding: 20px;
		position: relative;
		box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.05);
	}
	.workout-details h4 {
		margin: 0 0 10px 0;
		font-size: 1.2em;
		color: var(--primary);
	}
	.workout-details p {
		margin: 0;
		font-size: 0.9em;
		color: #555;
	}
	button {
		position: absolute;
		top: 20px;
		right: 20px;
		cursor: pointer;
		background: #f1f1f1;
		padding: 6px;
		border-radius: 5px;
		color: #333;
	}
</style>
