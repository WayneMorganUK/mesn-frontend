<script lang="ts">
	import { workouts, user } from './store';
	import { flip } from 'svelte/animate'; // First, Last, Invert, Play
	import { fly, fade } from 'svelte/transition';

	const handleClick = async (id: number) => {
		if ($user) {
			const token = $user.token;
			const response = await fetch('../../apis/deleteWorkout', {
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'POST',
				body: JSON.stringify({ id, token })
			});

			if (response.ok) {
				if ($workouts) {
					$workouts = $workouts.filter((item) => item._id != id);
				}
			}
		}
	};
</script>

{#if $workouts}
	{#each $workouts as workout (workout._id)}
		<div
			class="workout-details"
			animate:flip
			in:fly={{ x: -800, duration: 1200, delay: 600 }}
			out:fade
		>
			<h4>{workout.title}</h4>
			<p><strong>Load (kg): </strong>{workout.load}</p>
			<p><strong>Number of reps: </strong>{workout.reps}</p>
			<p>{workout.createdAt}</p>
			<button on:click={() => handleClick(workout._id)}
				><img class="bin" src="/trash.svg" alt="delete" /></button
			>
		</div>
	{/each}
{/if}

<style>
	.bin {
		height: 20px;
	}
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
