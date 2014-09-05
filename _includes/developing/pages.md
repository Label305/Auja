###Adding form elements

To add support for a new input element you'll need to do two things. Create the corresponding component... and register it in `form.react.js` by adding to the `FormItems` list to make the application aware of its existance. For example:

```javascript
'text': 'build/Components/Panels/Page/Form/text.react.js'
```

Now every item within a form with the type `text` will be passed to the component in the file `.../text.react.js`. This component is unaware of its location within the application but will be passed a property `item` the item that called it in existence. Which can look something like:

```json
{
    "type": "text",
    "text": {
        "name": "name",
        "label": "Name of club"
    }
}
```

For more reading on how to create form elements in React, you can refer to the [Forms](http://facebook.github.io/react/docs/forms.html) doc of React itself.
