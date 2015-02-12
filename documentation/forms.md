---
layout: documentation
title: "Forms"
---

Forms
=====

- [Introduction](#introduction)
- [Form item](#form-item)
- [Checkbox](#checkbox)
- [Date](#date)
- [E-mail](#e-mail)
- [Integer](#integer)
- [Number](#number)
- [Password](#password)
- [Range](#range)
- [Select](#select)
- [Submit](#submit)
- [Tel](#tel)
- [Text](#text)
- [Hidden](#hidden)
- [Textarea](#textarea)
- [Trumbowyg](#trumbowyg)
- [Url](#url)
- [File select](#file-select)

Introduction
-----

The Form is the place where your user interacts. A Form is a `Page item` and can be included in a page, a Form in turn has its own `Form items` which are listed on this page. As usual the Form element is wrapped in its own namespace.

```json
{
    "type": "form",
    "form": [
        /* The form items */
    ]
}
```

There are all kinds of form items, you can find them all below. Some have no specification, that implies that they only implement the abstract form item.

Form item
-------

Every form item should implement this `Abstract`

order | `integer` | Where in the form should this item show up
type | `string` | The item type
name | `string` | Name attribute of an input
label | `string` | Label to show with the input
value | `string` | Current value
required | `boolean` | If it is required to fill in (not always actually, e.g. a checkbox is an exception)

Checkbox
--------

A checkbox will be rendered as a combination of a `hidden` input with value `0` and a checkbox with value `1` both
having the same name. Meaning you'll always get your data.

checked | `boolean`

Date
--------

A Date input looks like this.

```json
{
    "type": "date",
    "date": {
        "name": "date",
        "value": "2014-11-06"
    }
}
```

E-mail
--------

An email input looks like this.

```json
{
    "type": "email",
    "email": {
        "name": "email",
        "value": "joris@label305.com"
    }
}
```


Integer
--------

An integer input looks like this.

```json
{
    "type": "integer",
    "integer": {
        "name": "integer",
        "value": 12
    }
}
```


Number
--------

A number input, with decimals looks like this.

```json
{
    "type": "number",
    "number": {
        "name": "number",
        "value": 0.2
    }
}
```


Password
--------

A password input looks like this.

```json
{
    "type": "password",
    "password": {
        "name": "password",
        "value": "Super secret"
    }
}
```


Range
--------

A range input looks like this.

```json
{
    "type": "range",
    "range": {
        "name": "range",
        "value": 15,
        "min": 10,
        "max": 15
    }
}
```

With the addition of minimal and maximum values.

min | `integer` | Minimal value
max | `integer` | Maximum value


Select
--------

A select dropdown input looks like this.

```json
{
    "type": "options",
    "options": {
        "name": "options",
        "value": "b",
        "options": {
            {
                "label": "Answer A",
                "value": "a"
            },
            {
                "label": "Answer B",
                "value": "b"
            }
        }
    }
}
```


Submit
--------

A submit button looks like this.

```json
{
    "type": "submit",
    "submit": {
        "name": "Update"
    }
}
```


Tel
--------

A telephone number input looks like this.

```json
{
    "type": "tel",
    "tel": {
        "name": "telephone",
        "value": "+31537113499"
    }
}
```


Text
--------

A plain text input looks like this.

```json
{
    "type": "text",
    "text": {
        "name": "text",
        "value": "Your short story"
    }
}
```


Hidden
--------

A hidden input looks like this.

```json
{
    "type": "hidden",
    "text": {
        "name": "token",
        "value": "Your CSRF token"
    }
}
```


Textarea
--------

A textarea input looks like this.

```json
{
    "type": "textarea",
    "textarea": {
        "name": "text",
        "value": "Your long story"
    }
}
```


Trumbowyg
--------

The available rich text editor [Trubowyg](http://alex-d.github.io/Trumbowyg/) looks like this.

```json
{
    "type": "trumbowyg",
    "trumbowyg": {
        "name": "textarea",
        "value": "Your long story",
        "buttons": ["header", "bold", "italic"]
    }
}
```

Buttons are optional using this `Abstract`.

buttons | `array` | Optional, head over to their ["Button pane" doc](http://alex-d.github.io/Trumbowyg/documentation.html)


Url
--------

An url input looks like this.

```json
{
    "type": "url",
    "url": {
        "name": "website",
        "value": "http://label305.github.io/Auja/"
    }
}
```

File select
-----

Start implementing file uploads by adding a `File Select` item to your `form`. You can specify if multiple files should be uploaded and you can fill the uploader with the current file.

### Example single file form

```json
{
    "type": "file_select",
    "file_select": {
        "target": "example/upload.php",
        "name": "mainlogo",
        "multiple": false,
        "file": {
            "ref": 851,
            "thumbnail": "example/thumb1.jpg"
        }
    }
}
```

### Example multiple files form

```json
{
    "type": "file_select",
    "file_select": {
        "target": "example/upload.php",
        "name": "logos[]",
        "multiple": true,
        "files": [
            {
                "ref": 1,
                "name": "file.jpg",
                "thubmnail": null,
                "type": "the/mimetype"
            },
            {
                "ref": 2,
                "name": "otherfile.jpg",
                "thubmnail": null,
                "type": "the/mimetype"
            }
        ]
    }
}
```

target | `string` | The target url for the upload requests
multiple | `boolean` | Default is false, set to true to enable multiple file uploads
file | `file` | Use when multiple is `false` to fill the data of the single file
files | `array` of `file` | Use when multiple is `true` to fill the data of the files
