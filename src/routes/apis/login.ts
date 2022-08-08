const URI = import.meta.env.VITE_MONGODB_URI
/** 
 * @type {import('@sveltejs/kit').RequestHandler} 
 */
export async function post({ request }: { request: Request; }) {
    try {
        const body = await request.json();
        const response = await fetch(URI + 'user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
        const json = await response.json()
        if (response.ok) {
            return {
                status: 200,
                body: json
            }
        }
        return {
            status: 404,
            body: json
        }
    } catch {
        return {
            status: 500,
            error: 'Connection Error'
        }
    }
}


