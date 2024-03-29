# push-form [![][badge-gzip]][link-bundlephobia]

[badge-gzip]: https://img.shields.io/bundlephobia/minzip/push-form.svg?label=gzipped
[link-bundlephobia]: https://bundlephobia.com/result?p=push-form

> Like `form.submit()`, but ajaxed. Lightweight, modern, promisified, uses `fetch`

Instead of causing a page load like `form.submit()` does, you can use `pushForm(form)` to send a form via `fetch`. It automatically reads all the fields using modern APIs and performs the request exactly as described by the `form` attributes.

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

You can post it via `fetch` with:

```js
import pushForm from 'push-form';

const form = document.querySelector('form');
form.addEventListener('submit', async event => {
	event.preventDefault();
	const response = await pushForm();
	if (response.ok) {
		alert('Thanks for your submission!');
	}
});
```

Or use `ajaxifyForm` to have it handle the user submission automatically:

```js
import {ajaxifyForm} from 'push-form';

const form = document.querySelector('form');
ajaxifyForm(form, {
	onSuccess: () => {/* ✅ */},
	onError: () => {/* ❌ */},
});
```

## API

### pushForm(formElement, requestInit)

Returns a `Promise` that resolves with a `Response` exactly as `fetch` does.

#### formElement

Type: `HTMLFormElement`

The form to submit. Its `action` and `method` attributes will be used to create the HTTP request.

#### requestInit

Type: `object` <br>
Example: `{headers: {Accept: 'application/json'}}`

This matches the second parameter of [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch), however the `body` and `method` will be overridden with what the `form` element specifies in its attributes.

### ajaxifyForm(formElement, options)

Stops the `submit` event of a form and uses `pushForm` instead. This returns a `function` that you can call to remove the `submit` handler.

#### formElement

Same as the one in `pushForm`

#### options

Type: `object`

Optional submission/error handlers and configuration for the `fetch`.

##### onSuccess

Type: `function`<br>
Example: `(fetchResponse) => {alert('The form was submitted!')}`

It will be called when `fetch` makes the request and the server returns a successful response (`response.ok`)

##### onError

Type: `function`<br>
Example: `(error) => {alert('Something happened:' + error.message)}`

It will be called when `fetch` fails the request or if the server returns an error response (`response.ok === false`)

##### requestInit

Same as the one in `pushForm`.

## Related

- [select-dom](https://github.com/fregante/select-dom) - Lightweight `querySelector`/`All` wrapper that outputs an Array.
- [doma](https://github.com/fregante/doma) - Parse an HTML string into `DocumentFragment` or one `Element`, in a few bytes.
- [Refined GitHub](https://github.com/sindresorhus/refined-github) - Uses this module.
