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
	<WorkoutForm />
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
</style>
