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

In the `paging` mixin you'll find that after the `resource` menu item was mounted inside the dom a request will be triggered to fetch the first page of `items`. This means that you'll see, for example, an add button before we've finished loading all kinds of data from the server.


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

Together with an, optional, `paging` object, that will point towards the next resource to make infinite scroll possible, as well as the total amount of items up to that request. The `total` key will be used when updating the entire view. For example, when you edit an entry inside a form, you want to update it elsewhere in a menu on the left.

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

###Text

The simplest of all input items, the text input, looks like this. It renders a single line input field.

```json
{
    "type": "text",
    "text": {
        "name": "text",
        "value": "Awesome text",
        "maxLength": 100
    }
}
```
It has a `maxLength` value, which can be used to restrict how many characters long the input can be. This is optional.

maxLength | `integer` | Maximum number of characters


###Textarea

A textarea input looks like this. It renders a multiline input field.

```json
{
    "type": "textarea",
    "textarea": {
        "name": "text",
        "value": "Your long story"
    }
}
```

###Checkbox

A checkbox will be rendered as a combination of a `hidden` input with value `0` and a checkbox with value `1` both having the same name. Meaning you'll always get your data.

```json
{
	"type": "checkbox",
	"checkbox": {
		"name": "useAuja",
		"label": "I will use Auja",
		"required": false,
		"value": true,
		"checked": true
	}
}
```
checked | `boolean`

###SelectMultipleCheckbox

A selectMultipleCheckbox will render a group of checkboxes. 

```json
{
    "type": "selectMultipleCheckbox",
    "selectMultipleCheckbox": {
        "name": "beers",
        "value": true,
        "options": {
            {
            	"label": "Grolsch",
                "checked": true
            },
            {
            	"label": "Heineken",
                "checked": true
            },
            {
                "label": "Budweiser",
                "checked": false
            },
        }
    }
}
```

###Color

A color input looks like this. This input type was introduced with HTML5, and it only accepts 6-digit hexadecimal values. RGB, RGBA, HSL, HSLA, named colors and other key terms are not supported by any major browser. Though it functions as a color input, it will render as a read-only text input. The reason for this is simple: Not all major browsers will show a color picker, nor are the color pickers similar in the browsers that do show them. In order to provide a consistent user experience across all browsers we use a text input in conjunction with a light-weight and flexible color picker [jQuery MiniColors](https://github.com/claviska/jquery-miniColors/).

```json
{
    "type": "color",
    "color": {
        "name": "color",
        "value": "#1ebab8"
    }
}
```

###Date

A Date input looks like this. Though it works as a date input, it will render in the DOM as a text input. The reason for this is that at the time of this writing not all major browsers support this HTML5 input type. In order to offer a good user experience across all browsers we use a text input in conjunction with a light-weight and flexible datepicker [Pikaday](https://github.com/dbushell/Pikaday).

This input is read-only, which means values cannot be entered manually. Values can only be changed by using the picker.

```json
{
    "type": "date",
    "date": {
        "name": "date",
        "value": "2014-11-06",
        "format": "YYYY-MM-DD",
        "min": "2013-01-01",
        "max": "2015-01-01"
    }
}
```
It has a format value, which determines how the date is shown to the user.

format | `string` | Display format

It does not affect the format the `value` is stored in. The format a date is stored is always "YYYY-MM-DD". The display format is applied through the very versatile [MomentJS](http://momentjs.com/) library. For more information about acceptable `format` values checkout the [MomentJS docs](http://momentjs.com/docs/#/displaying/) concerning the formatting of dates.

It is also possible to set an earliest and latest acceptable value through the `min` and `max` values. These are optional.

min | `string` | Minimal value
max | `string` | Maximum value

At the time of this writing it is not possible to use dynamic dates such as _now_ or _7 days ago_. These will not be accepted as a value nor as the earliest or latest selectable date. However, the [MomentJS](http://momentjs.com/) library we use does support this, so it is easy for anyone desiring this functionality to add it.

###Time

A Time input looks like this. Just like the date input, this will render as a text input in the DOM, while still functioning as a time input. The reason for this is that at the time of this writing not all major browsers support this HTML5 input type. In order to offer a good user experience across all browsers we use a text input in conjunction with a light-weight and apptly named clockpicker [Clockpicker](https://github.com/weareoutman/clockpicker).

This input is read-only, which means values cannot be entered manually. Values can only be changed by using the picker.

```json
{
    "type": "time",
    "date": {
        "name": "time",
        "value": "11:25",
        "format": "HH:mm",
        "min": "10:00",
        "max": "18:00"
    }
}
```
With the addition of a format value.

format | `string` | Display format

This sets the format the time is shown in, and does not affect the format the `value` is stored in. The format is applied through the very versatile [MomentJS](http://momentjs.com/) library. For more information about acceptable `format` values checkout the [MomentJS docs](http://momentjs.com/docs/#/displaying/) concerning the formatting of time.

It is also possible to set an earliest and latest acceptable value through the `min` and `max` values. These are optional.

min | `string` | Minimal value
max | `string` | Maximum value

At the time of this writing it is not possible to use dynamic times such as _now_ or _8 hours from now_. These will not be accepted as a value nor as the earliest or latest selectable time. However, the [MomentJS](http://momentjs.com/) library we use does support this, so it is easy for anyone desiring this functionality to add it.

###DateTime

A DateTime input looks like this. It renders a seperate date input showing the date and a seperate time input showing the time and a hidden input field containing the `value`. Upon submission the value in the hidden field is sent. Since this input uses a date and time input, each also uses the accompanying picker. [Clockpicker](https://github.com/weareoutman/clockpicker) for times, and [Pikaday](https://github.com/dbushell/Pikaday) for dates.

This input is read-only, which means values cannot be entered manually. Values can only be changed by using the picker.

```json
{
    "type": "datetime",
    "date": {
        "name": "datetime",
        "value": "2014-11-06 11:25",
        "format": "YYYY-MM-DD HH:mm",
        "min": "2014-01-01 00:00",
        "max": "2014-12-31 23:59"
    }
}
```
Of course datetime also has of a format value.

format | `string` | Display format

This sets the format the datetime is shown in, but **only in the hidden input field**. Currently, setting a format that shows in the date and time field is not supported. This will be added in a future release. As always, the format value does not affect the format the `value` is stored in. The format is applied through the very versatile [MomentJS](http://momentjs.com/) library. For more information about acceptable `format` values checkout the [MomentJS docs](http://momentjs.com/docs/#/displaying/) concerning the formatting of dates and time.

It is also possible to set an earliest and latest acceptable value through the `min` and `max` values. These are optional.

min | `string` | Minimal value
max | `string` | Maximum value

At the time of this writing it is not possible to use dynamic datetimes such as _now_ or _8 hours from now_. These will not be accepted as a value nor as the earliest or latest selectable datetime. However, the [MomentJS](http://momentjs.com/) library we use does support this, so it is easy for anyone desiring this functionality to add it.

###E-mail

An email input looks like this. This input type was introduced with HTML5, and its value is validated to the extent the browser supports it. At the time of this writing all major browsers support this input type, but the extent varies.

```json
{
    "type": "email",
    "email": {
        "name": "email",
        "value": "joris@label305.com"
    }
}
```
###Url

An url input looks like this. This input type was introduced with HTML5, and its value is validated to the extent the browser supports it. At the time of this writing all major browsers support this input type, but input validation is poor.

```json
{
    "type": "url",
    "url": {
        "name": "url",
        "value": "http://www.label305.com/"
    }
}
```

###Tel

A telephone input looks like this. This input type was introduced with HTML5, and at the time of this writing all major browsers support this input type. However, due to the many different international phone number formats, any input passes validation in all major browsers.

```json
{
    "type": "tel",
    "tel": {
        "name": "telephone",
        "value": "http://www.label305.com/"
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
        "value": 0.2,
        "min": 0.01,
        "max": 2
    }
}
```
It is also possible to restrict which values are acceptable by setting a lower and higher bound through the `min` and `max` values. These are optional.

min | `string` | Minimal value
max | `string` | Maximum value

###Integer

An integer input looks like this. It is essentially a number input with its stepping set to 1 so it only accepts non-fractional numbers. So, no decimals. 

```json
{
    "type": "integer",
    "integer": {
        "name": "integer",
        "value": 12,
        "min": 0,
        "max": 20
    }
}
```
It is also possible to restrict which values are acceptable by setting a lower and higher bound through the `min` and `max` values. These are optional.

min | `string` | Minimal value
max | `string` | Maximum value

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

This is a range input.

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

You can specify lower and upper limits of a range by setting the `min` and `max` values accordingly. Though optional in other input types, setting `min` and `max` values is **required for range inputs**.

min | `integer` | Minimal value
max | `integer` | Maximum value

###Select

A select dropdown input looks like this.

```json
{
    "type": "select",
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

###SelectMultiple

A select multiple input looks like this. This input type is often unwieldy from a UX standpoint. That is why we're using the [selectize.js library](https://github.com/brianreavis/selectize.js) for this input item. It transforms the usual area with options into a searchable single line where you can select the desired options one by one from a dropdown. To see what that looks like, visit the [selectize.js examples page](http://brianreavis.github.io/selectize.js/)

```json
{
    "type": "selectMultiple",
    "selectMultiple": {
        "name": "country",
        "value": ["NL-nl","DE-de"],
        "options": {
            {
            	"type": "option",
                "label": "The Netherlands",
                "value": "NL-nl"
            },
            {
            	"type": "option",
                "label": "Germany",
                "value": "DE-de"
            },
            {
            	"type": "option",
                "label": "Spain",
                "value": "ES-es"
            },
        }
    }
}
```
It is important to note that this input item always takes an array for its `value`, even when only a single option or less is selected.

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

buttons | `array` | Optional, head over to their ["Button panel" doc](http://alex-d.github.io/Trumbowyg/documentation.html)

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


