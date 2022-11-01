---
layout: default
title: Home
nav_order: 1
description: homepage
permalink: /
---

# {{site.title}}.
{: .fs-9 }

{{ site.description }}
{: .fs-6 .fw-300 }

[Get started now](#getting-started){: .btn .btn-primary .fs-5 .mb-4 .mb-md-0 .mr-2 } [View it on GitHub]({{ site.repo.url }}){: .btn .fs-5 .mb-4 .mb-md-0 }

---

## Welcome to the docs!

The {{ site.repo.name }} project is a template for a serverless, cloud native, form submission application. A react frontend is presented to the user by way of S3 and Cloudfront.  Users submit form data and blob uploads (PDFs, etc.) to the application.  Form data goes directly to an API Gateway backed by lambda, and blob data goes directly to an S3 bucket where it is virus scanned.  A DynamoDB Stream, a Lambda, and SES are used to send confiration of user submission.  All of this is protected by AWS Cognito.

The actual application is fairly 'hello world', but the repository support and configuration is full featured. This is by design, to allow for simpler project creation from the template.  Full CI/CD support with GitHub Actions, automated security scanning, docs site in GitHub Pages, PR/Issue templates, infrastructure and application deployment workflows, etc. is all included.

This is the documentation portal for the project, and should contain anything you may need.  Whether you're a new developer, a business owner, a product resource, or something else, this is the place to learn more.  To get started, please use the navigation panel on the left side of this screen.

Thanks, and we're glad you're here!

---

## About the project

The {{ site.repo.name }} project is &copy; 2022-{{ "now" | date: "%Y" }} by [Stratiform Digital](https://stratiform.digital).


#### Thank you to the contributors of {{ site.repo.name }}!

<ul class="list-style-none">
{% for contributor in site.github.contributors %}
  <li class="d-inline-block mr-1">
     <a href="{{ contributor.html_url }}"><img src="{{ contributor.avatar_url }}" width="32" height="32" alt="{{ contributor.login }}"/></a>
  </li>
{% endfor %}
</ul>

### Code of Conduct

Just the Docs is committed to fostering a welcoming community.

[View our Code of Conduct]({{ site.repo.url }}/tree/main/CODE_OF_CONDUCT.md) on our GitHub repository.
