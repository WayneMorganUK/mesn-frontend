/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
	// interface Locals {}
	// interface Platform {}
	// interface Session {}
	// interface Stuff {}
}

type Workouts = {
	_id: number;
	title: string
	createdAt: string
	updatedAt: string
	load: number
	reps: number
	__v: Nnmber
}

type ResponseError = {
	error: string
	emptyFields: Array<string>
}

type User = {
	email: string;
	token: string
}