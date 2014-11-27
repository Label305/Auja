---
layout: docs
title: "Introduction"
---

##Introduction
- <a href="#why">Why Auja</a>
- <a href="#philosophy">Auja Philosophy</a>
- <a href="#contribute">Contribute to Auja</a>

<div class="page-devider"></div>

<article>
	{% capture intro %}{% include introduction/intro.md %}{% endcapture %}
	{{ intro | markdownify }}
</article>

<div class="page-devider"></div>

<article>
	{% capture intro %}{% include introduction/philosophy.md %}{% endcapture %}
	{{ intro | markdownify }}
</article>

<div class="page-devider"></div>

<article>
	{% capture intro %}{% include introduction/contribute.md %}{% endcapture %}
	{{ intro | markdownify }}
</article>