import type { RequestHandler } from "@sveltejs/kit";
import { error } from "@sveltejs/kit";
const URI = import.meta.env.VITE_MONGODB_URI



export const POST: RequestHandler = async ({ request }) => {
    try {
        const body = await request.json();
        const response = await fetch(URI + 'user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
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




