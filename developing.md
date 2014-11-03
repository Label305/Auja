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
	<h2 class="text-blue uppercase">Setup</h2>
	<span class="categories">How to get up and running</span>
	{% capture setup %}{% include developing/setup.md %}{% endcapture %}
	{{ setup | markdownify }}
	<div class="devider-line"></div>
</div>


<div class="blog-item bg-white">
	<div class="avatar"></div>
	<div class="timeline"></div>
	<h2 class="text-blue uppercase">Spec testing</h2>
	<span class="categories">How we test if objects are properly put together</span>
	{% capture spec %}{% include developing/spec.md %}{% endcapture %}
	{{ spec | markdownify }}
	<div class="devider-line"></div>
</div>
