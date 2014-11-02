---
layout: empty
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
	<span class="categories">The part that shapes Auja</span>
	{% capture main_config %}{% include api/main_config.md %}{% endcapture %}
	{{ main_config | markdownify }}
	<div class="devider-line"></div>
</div>
