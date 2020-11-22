# push-form [![][badge-gzip]][link-bundlephobia]

[badge-gzip]: https://img.shields.io/bundlephobia/minzip/push-form.svg?label=gzipped
[link-bundlephobia]: https://bundlephobia.com/result?p=push-form

> Zero-effort nanomodule to submit a `<form>` element via `fetch` and receive the response.

Sit back and relax ’cuz `push-form` will take care of all your form-submitting needs. — As long as all you need is to submit a `<form>` element as-is.

You'll just need:

```js
pushForm(document.querySelector('form')).then(response => {
	if (response.ok) {
		alert('Thanks for your submission!');
	}
});
```

## Install

```
npm install push-form
```

```js
// This module is only offered as a ES Module
import pushForm from 'push-form';
```

## Usage

Given a regular form element:

```html
<form action="submissions.php" type="post">
	First name <input name="firstname" required /><br />
	Last name <input name="lastname" required /><br />
	Passport <input name="passport" type="file" required />
	<button>Submit</button>
</form>
```

You can ajaxify it with this simple code:

```js
import pushForm from 'push-form';

const form = document.querySelector('form');
form.addEventListener('submit', async event => {
	if (form.checkValidity()) {
		event.preventDefault();

		// The response is what `fetch` returns
		const response = await pushForm(form);
		if (response.ok) {
			form.reset();
			form.append('Form submitted!');
		} else {
			form.append('Aomething wrong happened');
		}
	}
});
```

## API

### pushForm(formElement, fetchInit)

Returns a `Promise` that resolves with a `Reponse` exactly as `fetch` does.

#### formElement

Type: `HTMLFormElement`

The form to submit. Its `action` and `method` attributes will be used to create the HTTP request.

#### fetchInit

Type: `FetchInit` <br>
Example: `{headers: {Accept: 'application/json'}}`

This matches the second parameter of [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch), however the `body` and `method` will be overridden with what the `form` element specifies in its attributes.

## Related

- [select-dom](https://github.com/fregante/select-dom) - Lightweight `querySelector`/`All` wrapper that outputs an Array.
- [doma](https://github.com/fregante/doma) - Parse an HTML string into `DocumentFragment` or one `Element`, in a few bytes.
- [Refined GitHub](https://github.com/sindresorhus/refined-github) - Uses this module.
