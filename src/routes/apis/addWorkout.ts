const URI = import.meta.env.VITE_MONGODB_URI
/** 
 * @type {import('@sveltejs/kit').RequestHandler} 
 */
export async function post({ request }: { request: Request; }) {
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
