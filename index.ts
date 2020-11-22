async function pushForm(
	form: HTMLFormElement,
	init: RequestInit = {}
): Promise<Response> {
	// TODO: drop `as` after https://github.com/microsoft/TSJS-lib-generator/issues/741
	init.body = new URLSearchParams(new FormData(form) as URLSearchParams);
	init.method = form.method;
	const headers = new Headers(init.headers);
	headers.append('Content-Type', 'application/x-www-form-urlencoded');

	return (pushForm.fetch ?? fetch)(form.action, init);
}

// Silently allow the user to override the fetch globally
namespace pushForm {
	export let fetch: typeof window.fetch;
}

export default pushForm;
