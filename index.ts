async function pushForm(
	form: HTMLFormElement,
	init: RequestInit = {}
): Promise<Response> {
	const fields = new FormData(form);
	const url = new URL(form.action, location.origin);
	init.headers = new Headers(init.headers);
	if (!init.headers.has('Accept')) {
		init.headers.append('Accept', 'text/html,application/xhtml+xml,application/xml');
	}

	init.method = form.method;
	if (form.method === 'get') {
		for (const [name, value] of fields) {
			if (typeof value === 'string') {
				url.searchParams.set(name, value);
			}
		}
	} else {
		init.body = fields;
		init.headers.append('Cache-Control', 'max-age=0');
	}

	return (pushForm.fetch ?? fetch)(url.toString(), init);
}

// Silently allow the user to override the fetch globally
namespace pushForm {
	export let fetch: typeof window.fetch;
}

export default pushForm;
