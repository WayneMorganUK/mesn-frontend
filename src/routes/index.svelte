<script lang="ts">
	import { workouts } from '$lib/store';
	import WorkoutDetails from '$lib/WorkoutDetails.svelte';
	import WorkoutForm from '$lib/WorkoutForm.svelte';

	export let json: Workouts[];
	$workouts = json;
</script>

<div class="home">
	<div class="workouts">
		<WorkoutDetails />
	</div>
	<div class="workout-form"><WorkoutForm /></div>
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
