const URI = import.meta.env.VITE_MONGODB_URI
/** 
 * @type {import('@sveltejs/kit').RequestHandler} 
 */
export async function post({ request }: { request: Request; }) {
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


