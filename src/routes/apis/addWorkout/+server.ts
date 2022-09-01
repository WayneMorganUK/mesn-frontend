import type { RequestHandler } from "@sveltejs/kit";
import { error } from "@sveltejs/kit";
const URI = import.meta.env.VITE_MONGODB_URI


export const POST: RequestHandler = async ({ request }) => {
	try {
		const { workout, token } = await request.json();
		const response = await fetch(URI + 'workouts/', {
			method: 'POST',
			body: JSON.stringify(workout),
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`,
			}
		});
		const json = await response.json()
		if (response.ok) {
            return new Response(String(JSON.stringify(json)));
        }
        throw error(404, json)

    }
    catch {
        throw error(500, 'connection error');
    }
}

