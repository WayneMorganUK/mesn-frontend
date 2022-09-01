<script lang="ts">
	import Navbar from '$lib/Navbar.svelte';
</script>

<svelte:head>
	<style>
		@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;800&family=VT323&display=swap');
	</style>
</svelte:head>

<Navbar />

<slot />

<style>
	:global(:root) {
		--primary: #1aac83;
		--error: #e7195a;
	}

	:global(body) {
		background: #f1f1f1;
		margin: 0;
		font-family: 'Poppins';
	}
</style>
