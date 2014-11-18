---
layout: docs
title: "Getting started with Auja"
---
<article>
	{% capture intro %}{% include developing/intro.md %}{% endcapture %}
	{{ intro | markdownify }}
</article>

<article>
	{% capture main_config %}{% include developing/setup.md %}{% endcapture %}
	{{ main_config | markdownify }}
</article>

<article>
	{% capture menus %}{% include developing/spec.md %}{% endcapture %}
	{{ menus | markdownify }}
</article>