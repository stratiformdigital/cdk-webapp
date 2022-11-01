---
layout: default
title: Subscribing to Alerts
parent: Development Workflows
nav_order: 6
---

# Subscribing to Alerts
{: .no_toc }

How-to to subscribe to alerts from a stage.
{: .fs-6 .fw-300 }

## Table of contents
{: .no_toc .text-delta }

- TOC
{:toc}

---

### Subscribing to Alerts

This project uses SNS for near real time alerting of application health and performance.  Subscriptions to this topics are not made automatically, for a few reasons (see alerts service details).  This will guide you in how to create a sbuscription.

#### Prerequisites:
{: .no_toc }
- Completed all [onboarding]({{ site.baseurl }}{% link docs/onboarding/onboarding.md %})

#### Procedure
{: .no_toc }
- Go to the AWS Console
- Choose your region in the top right drop down.
- Navigate to SNS
- Click topics (see left hand side hamburger menu) and select your stage's topic
- Click add subscription and follow the prompts.
- If you control the inbox for the subscription you just added, go to the inbox and click through the confirmation email from AWS.
- Repeat these steps for the application's other region.

#### Notes
{: .no_toc }
- 

