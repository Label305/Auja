---
layout: empty
title: "Auja - Developing for"
---

<div class="blog-item bg-white">
	<div class="avatar"></div>
	<div class="timeline"></div>
	<h2 class="text-blue uppercase">Developing for Auja</h2>
	<span class="categories">Get up and running contributing to the Auja repo</span>
	{% capture intro %}{% include developing/intro.md %}{% endcapture %}
	{{ intro | markdownify }}
	<div class="devider-line"></div>
</div>

<div class="blog-item bg-white">
	<div class="avatar"></div>
	<div class="timeline"></div>
	<h2 class="text-blue uppercase">Requests &amp; routing</h2>
	<span class="categories">Doing a request and adding magic</span>
	{% capture requests %}{% include developing/requests.md %}{% endcapture %}
	{{ requests | markdownify }}
	<div class="devider-line"></div>
</div>

<div class="blog-item bg-white">
	<div class="avatar"></div>
	<div class="timeline"></div>
	<h2 class="text-blue uppercase">Menu's</h2>
	<span class="categories">Managing menu's and writing additions</span>
	{% capture menus %}{% include developing/menus.md %}{% endcapture %}
	{{ menus | markdownify }}
	<div class="devider-line"></div>
</div>

<div class="blog-item bg-white">
	<div class="avatar"></div>
	<div class="timeline"></div>
	<h2 class="text-blue uppercase">Pages &amp; forms</h2>
	<span class="categories">Receiving and presenting content</span>
	{% capture pages %}{% include developing/pages.md %}{% endcapture %}
	{{ pages | markdownify }}
	<div class="devider-line"></div>
</div>
