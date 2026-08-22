---
layout: default
title: Projects
---

<h1>Projects</h1>

{% for repo in site.data.projects %}
<div class="repo-card">
    {% if repo.site_url %}
    <a href="{{ repo.site_url }}" target="_blank" class="site-link" aria-label="Visit site">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"/>
            <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"/>
        </svg>
    </a>
    {% endif %}
    <div class="repo-header">
        <h3>
            <a href="{{ repo.url }}" target="_blank">{{ repo.name }}</a>
        </h3>
        <span class="repo-updated">Updated {{ repo.updated | append: "-01" | date: "%b %Y" }}</span>
    </div>
    <p class="repo-description">{{ repo.description }}</p>
    <div class="repo-meta">
        <span class="language">
            <span class="language-dot" style="background-color: {{ repo.language_color }};"></span>
            {{ repo.language }}
        </span>
    </div>
</div>
{% endfor %}

<div class="repo-footer">
    <a href="https://github.com/MSadraShakouri?tab=repositories" target="_blank">View all on GitHub →</a>
</div>
