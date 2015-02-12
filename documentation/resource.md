---
layout: documentation
title: "Resources"
---

Resources
=====

- [Introduction](#introduction)
- [Searchable](#searchable)
- [Sortable](#sortable)

Introduction
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

### Resource - items

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

### Resource - properties

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

### Sortable - sortable_item

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