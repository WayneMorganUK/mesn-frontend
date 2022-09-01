import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

export const workouts: Writable<Workouts[] | null> = writable([])
export const user: Writable<User | null> = writable(null)
export const currentPage: Writable<string | null> = writable(null)
export const store = writable('')