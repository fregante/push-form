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

interface Options {
	request?: RequestInit;
	onSuccess?: (r: Response) => void | Promise<void>;
	onError?: (r: unknown) => void | Promise<void>;
}

function onErrorDefault(error: unknown): void {
	alert('The form couldn’t be submitted');
	throw error;
}

function onSuccessDefault(): void {
	alert('Thanks for your submission');
}

function ajaxifyForm(
	form: HTMLFormElement,
	{
		onSuccess = onSuccessDefault,
		onError = onErrorDefault,
		request = {}
	}: Options = {}
): () => void {
	const submitHandler = async (event: Event) => {
		event.preventDefault();
		form.disable = true;
		try {
			const response = await pushForm(form, request);
			if (!response.ok) {
				throw new Error(response.statusText);
			}

			void onSuccess(response);
		} catch (error: unknown) {
			void onError(error);
		}
	};

	form.addEventListener('submit', submitHandler);

	return () => {
		form.removeEventListener('submit', submitHandler);
	};
}

// Allow the user to override the fetch globally
namespace pushForm {
	export let fetch: typeof window.fetch;
}

export default pushForm;
export {ajaxifyForm};
