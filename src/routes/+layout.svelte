<script lang="ts">
	import Navbar from '$lib/Navbar.svelte';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<svelte:head>
	<style>
		@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;800&family=VT323&display=swap');
	</style>
</svelte:head>

<Navbar />

{@render children?.()}

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
