const URI = import.meta.env.VITE_MONGODB_URI
/** 
 * @type {import('@sveltejs/kit').RequestHandler} 
 */
export async function post({ request }: { request: Request; }): Promise<{ status: number; body: string; }> {
	const body = await request.json();
	const response = await fetch(URI + '/' + body, {
		method: 'DELETE'
	});
	const json = await response.json();

	if (response.ok) {
		return {
			status: 200,
			body: JSON.stringify({ json })
		}
	}
	return {
		status: 404,
		body: JSON.stringify({ json })
	}
}

