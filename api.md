---
layout: docs
title: "Auja - API"
---

<div class="blog-item bg-white">
	<div class="avatar"></div>
	<div class="timeline"></div>
	<h2 class="text-blue uppercase">API</h2>
	{% capture intro %}{% include api/intro.md %}{% endcapture %}
	{{ intro | markdownify }}
	<div class="devider-line"></div>
</div>

<div class="blog-item bg-white">
	<div class="avatar"></div>
	<div class="timeline"></div>
	<h2 class="text-blue uppercase">Main config</h2>
	<span class="categories">The part that makes Auja pretty</span>
	{% capture main_config %}{% include api/main_config.md %}{% endcapture %}
	{{ main_config | markdownify }}
	<div class="devider-line"></div>
</div>

<div class="blog-item bg-white">
	<div class="avatar"></div>
	<div class="timeline"></div>
	<h2 class="text-blue uppercase">Menus and menu items</h2>
	<span class="categories">Menu's and what they can do for you</span>
	{% capture menus %}{% include api/menus.md %}{% endcapture %}
	{{ menus | markdownify }}
	<div class="devider-line"></div>
</div>

<div class="blog-item bg-white">
	<div class="avatar"></div>
	<div class="timeline"></div>
	<h2 class="text-blue uppercase">Pages and page items</h2>
	<span class="categories">Pages can show you the way</span>
	{% capture pages %}{% include api/pages.md %}{% endcapture %}
	{{ pages | markdownify }}
	<div class="devider-line"></div>
</div>

<div class="blog-item bg-white">
	<div class="avatar"></div>
	<div class="timeline"></div>
	<h2 class="text-blue uppercase">Forms</h2>
	<span class="categories">Where place you type</span>
	{% capture forms %}{% include api/forms.md %}{% endcapture %}
	{{ forms | markdownify }}
	<div class="devider-line"></div>
</div>
