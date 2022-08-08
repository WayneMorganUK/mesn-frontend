const URI = import.meta.env.VITE_MONGODB_URI
/** 
 * @type {import('@sveltejs/kit').RequestHandler} 
 */
export async function post({ request }: { request: Request; }) {
    console.log('api', URI)
    const body = await request.json();
    try {
        const response = await fetch(URI, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        });
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
            body: 'Connection Error'
        }
    }
}





