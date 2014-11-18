---
layout: docs
title: "API"
---

<article>
	{% capture intro %}{% include api/intro.md %}{% endcapture %}
	{{ intro | markdownify }}
</article>

<article>
	{% capture main_config %}{% include api/main_config.md %}{% endcapture %}
	{{ main_config | markdownify }}
</article>

<article>
	{% capture menus %}{% include api/menus.md %}{% endcapture %}
	{{ menus | markdownify }}
</article>

<article>
	{% capture pages %}{% include api/pages.md %}{% endcapture %}
	{{ pages | markdownify }}
</article>

<article>
	{% capture forms %}{% include api/forms.md %}{% endcapture %}
	{{ forms | markdownify }}
</article>