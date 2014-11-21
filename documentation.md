---
layout: docs
title: "Documentation"
---

##Documentation
- <a href="#intro">Introduction</a>
- <a href="#main_config">Main config</a>
- <a href="#menus">Menus</a>
- <a href="#icons">Icons</a>
- <a href="#resources">Resources</a>
- <a href="#searchable">Searchable</a>
- <a href="#sortable">Sortable</a>
- <a href="#pages">Pages</a>
- <a href="#forms">Forms</a>

<div class="page-devider"></div>

<article>
	{% capture intro %}{% include documentation/intro.md %}{% endcapture %}
	{{ intro | markdownify }}
</article>

<div class="page-devider"></div>

<article>
	{% capture main_config %}{% include documentation/main_config.md %}{% endcapture %}
	{{ main_config | markdownify }}
</article>

<div class="page-devider"></div>

<article>
	{% capture menus %}{% include documentation/menus.md %}{% endcapture %}
	{{ menus | markdownify }}
</article>

<div class="page-devider"></div>

<article>
	{% capture main_config %}{% include documentation/icons.md %}{% endcapture %}
	{{ main_config | markdownify }}
</article>

<div class="page-devider"></div>

<article>
	{% capture menus %}{% include documentation/resources.md %}{% endcapture %}
	{{ menus | markdownify }}
</article>

<div class="page-devider"></div>

<article>
	{% capture menus %}{% include documentation/searchable.md %}{% endcapture %}
	{{ menus | markdownify }}
</article>

<div class="page-devider"></div>

<article>
	{% capture menus %}{% include documentation/sortable.md %}{% endcapture %}
	{{ menus | markdownify }}
</article>

<div class="page-devider"></div>

<article>
	{% capture pages %}{% include documentation/pages.md %}{% endcapture %}
	{{ pages | markdownify }}
</article>

<div class="page-devider"></div>

<article>
	{% capture forms %}{% include documentation/forms.md %}{% endcapture %}
	{{ forms | markdownify }}
</article>