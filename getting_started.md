---
layout: docs
title: "Getting started"
---

##Getting started
- <a href="#intro">Introduction</a>
- <a href="#installation">Stand alone installation</a>
- <a href="#develop">Develop</a>
- <a href="#spec">Spec testing</a>

<div class="page-devider"></div>

<article>
	{% capture intro %}{% include getting_started/intro.md %}{% endcapture %}
	{{ intro | markdownify }}
</article>

<div class="page-devider"></div>

<article>
	{% capture intro %}{% include getting_started/installation.md %}{% endcapture %}
	{{ intro | markdownify }}
</article>

<div class="page-devider"></div>

<article>
	{% capture intro %}{% include getting_started/develop.md %}{% endcapture %}
	{{ intro | markdownify }}
</article>

<div class="page-devider"></div>

<article>
	{% capture intro %}{% include getting_started/spec.md %}{% endcapture %}
	{{ intro | markdownify }}
</article>