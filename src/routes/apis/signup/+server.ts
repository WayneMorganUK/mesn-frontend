import type { RequestHandler } from "@sveltejs/kit";
import { error } from "@sveltejs/kit";
const URI = import.meta.env.VITE_MONGODB_URI

export const POST: RequestHandler = async ({ request }) => {
    const body = await request.json();
    try {
        const response = await fetch(URI + 'user/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })

        console.log('ERROR', response)
        const json = await response.json()
        if (response.ok) {
            return new Response(String(JSON.stringify(json)));
        }
        error(404, json);

    }
    catch {
        error(500, 'connection error');
    }
}

