import type { RequestHandler } from "@sveltejs/kit";
import { error } from "@sveltejs/kit";
const URI = import.meta.env.VITE_MONGODB_URI



export const POST: RequestHandler = async ({ request }) => {
	try {
		const { id, token } = await request.json();
		const response = await fetch(URI + 'workouts/' + id, {
			method: 'DELETE',
			headers: {
				'Authorization': `Bearer ${token}`
			}
		})
		const json = await response.json();

		if (response.ok) {
            return new Response(String(JSON.stringify(json)));
        }
        error(404, json);

    }
    catch {
        error(500, 'connection error');
    }
}

