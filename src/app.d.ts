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
	_id: Number;
	title: String
	createdAt: String
	updatedAt: String
	load: Number
	reps: Number
	__v: Number
}

type ResponseError = {
	error: String
	emptyFields: Array<string>
}