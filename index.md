---
layout: empty
title: "Auja"
---

<div class="blog-item bg-white">
	<div class="avatar intro"></div>
	<div class="timeline"></div>
	<h2 class="text-blue uppercase">Introduction to Auja</h2>
	<span class="categories">Just a little about our interface</span>
	{% capture intro %}{% include intro.md %}{% endcapture %}
	{{ intro | markdownify }}
	<div class="devider-line"></div>
</div>

<div class="blog-item bg-white">
	<div class="avatar install"></div>
	<div class="timeline"></div>
	<h2 class="text-blue uppercase">Installation</h2>
	<span class="categories">Install Auja easily</span>
	{% capture installation %}{% include installation.md %}{% endcapture %}
	{{ installation | markdownify }}
	<div class="devider-line"></div>
</div>

<div class="blog-item bg-white">
	<div class="avatar docs"></div>
	<div class="timeline"></div>
	<h2 class="text-blue uppercase">Documentation</h2>
	<span class="categories">All you need to know</span>
	{% capture documentation %}{% include documentation.md %}{% endcapture %}
	{{ documentation | markdownify }}
	<div class="devider-line"></div>
</div>
