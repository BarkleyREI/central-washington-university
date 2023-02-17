---
title: "Configuration"
---

## Project settings

You can set arbitrary variables to the fractal object for use in previews and components.

```javascript
fractal.set('variable', value);
```

Here are some samples of values already being stored:

```javascript
fractal.set('project.is_server', 'true');
```

We are detecting if we are running Fractal as a server or if we are running a full build. This is used to add or strip out functionality that a client would need or not need to see.

```javascript
fractal.set('project.tailwindcdn', 'https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css');
fractal.set('project.jquerycdn', 'https://code.jquery.com/jquery-3.5.1.min.js');
```

We are storing commonly used CDN URLs, so we do not need to update every preview template when changing them.

These variables could store objects as well, so you could potentially create an array of CDN URLs that are included automatically on every preview.

We are not doing that here because we want Tailwind separate so that it is only included where necessary.

## Custom theme

BarkleyREI uses a custom theme based on Fractal's default theme Mandelbrot. 

The theme is located here: [https://github.com/BarkleyREI/rei-cursion](https://github.com/BarkleyREI/rei-cursion)

If necessary, you can pass in the same parameters you would normally pass to Mandelbrot. Some settings may be required and are included automatically in the theme.

**rei-cursion** also supports a new setting, `devpanels`, which control which tabs appear under each component while the server is running. It accepts the same array as `panels`.