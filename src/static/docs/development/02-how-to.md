---
title: "How to perform common tasks"
---

## Getting Started

`npm install`

Install the dependencies.

`npm start`

Start the server.

## Adding a new pattern

1. Figure out the appropriate collection to include the pattern. 
   
    - Atoms/smallest components under Patterns
    - Medium/Largest components under Components
    - Templates/Full Pages under Templates
    
2. Create a new folder in the appropriate section using the BEM name of your component. (e.g. button, accordion, news-and-events)
3. Create a HBS file. (e.g. button.hbs)
4. Create a config file. (e.g. button.config.json) (optional but recommended)

```json
{
    "title": "Button",
    "status": "wip",
    "meta": {},
    "context": {
        
    }
}
```

Config files can also be in YAML, but for all our examples and documentation we will use JSON.

### Name

You can provide a custom **name** or **handler** entry in the config to adjust the reference handler the pattern uses.

For example:

```json
{
    "title": "Button",
    "name": "super-button",
    "status": "wip",
    "context": {
        
    }
}
```

```json
{
    "title": "Button",
    "handler": "super-button",
    "status": "wip",
    "context": {
        
    }
}
```

You would use `\{{> @super-button}}` or `\{{render '@super-button'}}` to render the pattern.

### Status

A pattern can have one of three statuses:

1. **ready** - Pattern is ready for use and feature complete
2. **wip** - Pattern is in progress 
3. **prototype** - Pattern is experimental

It is possible to create custom statuses with additional configuration of the theme.

Currently, this is not displayed in the UI with the BarkleyREI Fractal theme.

### Preview

You can change what file will render the pattern using the `preview` entry.

For example:

```json
{
    "title": "Button",
    "status": "ready",
    "preview": "@template",
    "context": {
        
    }
}
```

The pattern would now use `_template.hbs` to render instead of `_preview.hbs`. 

The default is `_preview.hbs`. Fractal searches the same directory as the component for the `_preview.hbs` template, and every parent directory until it finds one.

For more information on configuration, read the documentation: [https://fractal.build/guide/core-concepts/configuration-files.html](https://fractal.build/guide/core-concepts/configuration-files.html)

## Creating a variant of a pattern

You can add variants to the pattern in two ways:

### 1. Config

Add the variants array to the config.

```json
{
    "title": "Button",
    "status": "wip",
    "context": {
        
    },
    "variants": [
        {
            "name": "Secondary",
            "context": {

            }
        }
    ]
}    
```

The context of each variant *inherits* the same data as the parent. You only need to apply data necessary for that variant. **Name** is a required field for a variant and will cause errors if omitted.

### 2. File

If you need alternate markup for a variant, you can create a new HBS file and give it a BEM syntax alternate name.

For example, 
```markdown
components /
    button /
        button.config.json
        button.hbs
        button--secondary.hbs
```

The context for this variant is the default, unless you specify a variant in the config with the same name. In this example, you would need a variant with the name "secondary" to pass specific data to the newly created button--secondary.hbs.

```json
{
    "title": "Button",
    "status": "wip",
    "context": {
        
    },
    "variants": [
        {
            "name": "Secondary",
            "context": {

            }
        }
    ]
}    
```

For more information on variants, read the documentation: [https://fractal.build/guide/components/variants.html#creating-variants](https://fractal.build/guide/components/variants.html#creating-variants) 

## Sorting patterns

You can control the order of any pattern by prefixing the file or folder name with a two digit number, prefixed with a zero if it's less than 10.

Example: 
```markdown
components /
    01-buttons /
        buttons.hbs
    accordions /
        accordions.hbs
```

You can also control the order in the respective config files.

```json
{
    "title": "Button",
    "status": "wip",
    "order": 2,
    "context": {
        
    }
}    
```

The preference is to use the filename so it is obvious.

## Hiding patterns

If you do not want a pattern to appear in the UI, prefix the file or folder name with an underscore.

Example:
```markdown
components /
    _private /
        thing.hbs
    button /
        button.hbs
        _secret-button.hbs
```

This is useful for splitting a component into reusable parts without needing to create new patterns or components.

## Passing Data to a Pattern

It is possible to merge in specific data to an existing pattern or override all the data when rendering. 

In this example we'll have a testing pattern that pulls in an existing button pattern and changes the title of the button.

*example.config.json*
```json
{
    "title": "Example",
    "status": "ready",
    "context": {
        "button": {
            "title": "Test"
        }
    }        
}
```

*example.hbs*
```handlebars
<div class="example">
    \{{render '@button' button merge=true}}    
</div>
```

```handlebars
<div class="example">
    \{{> @button button merge=true}}    
</div>
```

If `merge=true` is omitted, then the context of the button will be replaced by the context you pass in.

## Attach scripts to patterns

By default, _preview.hbs is used to render patterns in the preview and when compiled.

The following code renders scripts into the template:

```handlebars
{{#if _target.meta.scripts}}
    {{#each _target.meta.scripts}}
        <script type="text/javascript" src="{{ scriptPath this }}"></script>
    {{/each}}
{{/if}}
```

In the pattern's config, you can add an array named "scripts" to the meta object to set what scripts load.

```json
{
    "title": "Level Page",
    "meta": {
        "scripts": [
            "vendor",
            "main",
            "level"                        
        ]   
    },
    "context": {
        
    }
}
```

This will add main.js and level.js to the layout when it is rendered.

Note: This is custom functionality and not documented on Fractal's website.

## Meta information

The meta block can be passed certain values to influence the `_preview.hbs` layout. These values are custom and not specific to Fractal, and it is possible to add more values or settings in future updates.

```json
{
    "title": "Button",
    "meta": {
        "scripts": [
            "level"
        ],
        "tailwind": true,
        "margin": "0",
        "background": "#000000",
        "align": "flex-start"
    }
}
```

`scripts` - Determines which `script.js` files are loaded into the preview window. Files are loaded from `assets/js`.

`tailwind` - Imports the TailwindCSS framework into the preview, to allow building layouts for demonstrative purposes without adding unnecessary CSS to the project.

`margin` - Sets the outer margin of the preview window. Default is 16px.

`background` - Sets the default background of the preview window. Default is #ffffff;

`align` - Sets a CSS grid/flex alignment value to `place-items` so that the component can be properly aligned in the preview window. Defaults to `center`. This may pose issues to anything that reacts poorly to `display: grid;`, such as carousels.

Note: This is custom functionality and not documented on Fractal's website.

## Theme

BarkleyREI uses a custom Fractal theme. The theme can be found on GitHub here: [https://github.com/BarkleyREI/rei-cursion](https://github.com/BarkleyREI/rei-cursion)

