<script lang="ts">
	import { goto } from '$app/navigation';
	import { user, workouts, currentPage } from '$lib/store';
	import WorkoutDetails from '$lib/WorkoutDetails.svelte';
	import WorkoutForm from '$lib/WorkoutForm.svelte';
	import { onMount } from 'svelte';

	$workouts = null;
	onMount(async () => {
		const _user = localStorage.getItem('user');
		if (_user) {
			const __user: User = JSON.parse(_user);
			$user = __user;
			const response = await fetch('./apis/getWorkouts', {
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'POST',
				body: JSON.stringify($user.token)
			});
			if (response.ok) {
				$workouts = await response.json();
			}
		} else {
			goto('/login');
		}
	});
</script>

<div class="home">
	{#if $user}
		<div class="workouts">
			<WorkoutDetails />
		</div>

		<div class="workout-form"><WorkoutForm /></div>
	{/if}
</div>

<style>
	.home {
		max-width: 1400px;
		padding: 20px;
		margin: 0 auto;
		display: grid;
		grid-template-columns: 3fr 1fr;
		gap: 100px;
	}
	.workout-form {
		min-width: 200px;
	}

	@media only screen and (max-width: 910px) {
		.home {
			gap: 60px;
		}
	}

	@media only screen and (max-width: 760px) {
		.home {
			gap: 20px;
		}
	}
	@media only screen and (max-width: 530px) {
		.home {
			grid-template-columns: 1fr;
		}
		.workouts {
			grid-row-start: 2;
		}
	}
</style>
