---
layout: documentation
title: "Auja Docs"
---

Json representation
=====

- [Introduction](#introduction)
- [Resources](#resources)
- [Searchable](#searchable)
- [Sortable](#sortable)
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

Resources
-----

The more advanced menu item, the whole idea behind Auja is that your users can quickly navigate through the admin interface.
So requests that serve a database response should be done after the initial menu is loaded. This is where the resource menu item comes into play.

In the `paging` mixin you'll find that after the `resource` menu item was mounted inside the dom a request will be triggered to fetch the first
page of `items`. This means that you'll see, for example, an add button before we've finished loading all kinds of data from the server.


```json
{
    "type": "resource",
    "order": 4,
    "resource": {
        "target": "example/clubs_index.json",
        "properties": {
            "searchable": {
                "target": "example/club_index.json?q=%s"
            }
        }
    }
}
```

target | `string` | Endpoint where the items can be fetched
properties | `Object` | Different properties active on this object, more about those after the break

###Resource - items

When a resource is mounted we can render all of the menu items inside the resource item. A request to the target should return the items as shown below.

Together with an, optional, `paging` object, that will point towards the next resource to make infinite scroll possible, as well as the total amount of items
up to that request. The `total` key will be used when updating the entire view. For example, when you edit an entry inside a form, you want to update it elsewhere in a
menu on the left.

```json
{
    "type": "items",
    "items": [
        /* The menu items */
    ],
    "paging": {
        "next": "example/clubs_index.json?page=2",
        "total": "example/clubs_index.json?from=0&till=1000"
    }
}
```

###Resource - properties

To be able to add special functionalities to a resource we can add properties. These include `searchable` and `sortable`.

Searchable
-----

A resource can be searchable. Searchable adds a searchbox to the top of the resource.

```json
}
    "properties": {
        "searchable": {
            "target": "example/club_index.json?q=%s"
        }
    }
}
```

target | `string` | url where the entered search term is merged with

Sortable
-----

A resource can be sortable. Sortable will create a tree from the resource, note that you cannot paginate a sortable resource. Also, when items are loaded from
the server these should all be `sortable_item` objects.

```json
{
    "properties": {
        "sortable": {
            "target": "somewhere/to/save/the/order"
        }
    }
}
```

target | `string` | url where the new ordering is posted to

###Sortable - sortable_item

When the tree changes the new tree will be submitted to the server, all entries will have, at least, three keys `id`, `left` and `right`.
Which are represented as a nested set. An item within a sortable resource looks like this.

```json
{
    "type": "sortable_item",
    "sortable_item": {
        "id": 4,
        "text": "Contact",
        "target": "example/pages/4/edit",
        "left": 7,
        "right": 12
    }
}
```

id | `string` |
text | `string` | Inside the element
target | `string` | To do a GET request to (similiar to `Link`)
left | `integer` | Left value of nested set
right | `integer` | Right value of nested set

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


###Page item

Every type of page item should implement this `Abstract`

order | `integer` | Where in the page should this item show up
type | `string` | Which type of page item should be rendered

###Header

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

###Form

The place with which your user interacts. It even has its own chapter, called `Forms`. As usual it again is wrapped in its own namespace

```json
{
    "type": "form",
    "form": [
        /* The form items */
    ]
}
```

Forms
-----

There are all kinds of form items, you can find them all below. Some have no specification, that implies that they only implement the abstract form item.

###Form item

Every form item should implement this `Abstract`

order | `integer` | Where in the form should this item show up
type | `string` | The item type
name | `string` | Name attribute of an input
label | `string` | Label to show with the input
value | `string` | Current value
required | `boolean` | If it is required to fill in (not always actually, e.g. a checkbox is an exception)

###Checkbox

A checkbox will be rendered as a combination of a `hidden` input with value `0` and a checkbox with value `1` both
having the same name. Meaning you'll always get your data.

checked | `boolean`

###Date

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

###E-mail

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

###Integer

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

###Number

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

###Password

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

###Range

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

###Select

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

###Submit

A submit button looks like this.

```json
{
    "type": "submit",
    "submit": {
        "name": "Update"
    }
}
```

###Tel

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

###Text

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

###Textarea

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

###Trumbowyg

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

###Url

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


