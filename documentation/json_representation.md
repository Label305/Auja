---
layout: documentation
title: "Auja Docs"
---

Json representation
=====

- [Introduction](#introduction)
- [Pages](#pages)
- [Forms](#forms)

Introduction
-----

Since we support routing, which ables us to hook up to different api types, we can represent our object in all kinds of ways. But the most simplest, and currently only implemented way, of getting things up and running is by doing AJAX calls to endpoints that return JSON.

All JSON objects in our api's are wrapped in their own namespace with a `type` key that announces that presence of the namespace. For example:

```json
{
	"type": "form",
	"form": {
		/* A Form object */
	}
}
```

Pages
-----

These are the wider panes where the content is presented and can be edited.

A page is a panel which can contain page items.

```json
{
    "type": "page",
    "page": [
        /* The page items */
    ]
}
```


### Page item

Every type of page item should implement this `Abstract`

order | `integer` | Where in the page should this item show up
type | `string` | Which type of page item should be rendered

### Header

A header is commonly used page item at the top of a page

```json
{
    "type": "header",
    "header": {
        "text": "Edit club"
    }
}
```

text | `string` | Text it can contain

### Form

The place with which your user interacts. It even has its own chapter, called `Forms`. As usual it again is wrapped in its own namespace

```json
{
    "type": "form",
    "form": [
        /* The form items */
    ]
}
```

