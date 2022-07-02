const URI = import.meta.env.VITE_MONGODB_URI

/** 
 * @type {import('@sveltejs/kit').RequestHandler} 
 */
export async function get() {
    const response = await fetch(URI);
    const json = await response.json();

    if (response.ok) {
        return {
            body: { json: json }
        }
    }
    else {
        return {
            status: 404
        }
    }
}