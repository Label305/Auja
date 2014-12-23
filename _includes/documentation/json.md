<h3 id="json_representation" class="anchor">JSON representation</h3>

Since we support routing, which ables us to hook up to different api types, we can represent our object in all kinds of ways. But the most simplest, and currently only implemented way, of getting things up and running is by doing AJAX calls to endpoints that return JSON.

All JSON objects in our api's are wrapped in their own namespace with a `type` key that announces that presence of the namespace. For example:


	{
		"type": "form",
		"form": {
			/* A Form object */
		}
	}