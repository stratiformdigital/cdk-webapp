---
layout: default
title: AWS Login
parent: Development Workflows
nav_order: 1
---

# AWS Login
{: .no_toc }

Authenticating to an AWS account(s) is a required first step for many workflows.
{: .fs-6 .fw-300 }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}
---

### AWS Console Login

To get to the AWS Console:
- Go to the AWS SSO login endpoint [here]({{ site.aws.login_url }}).
- Login with your Google account
- Select the appropriate account for {{ site.repo.name }}.
- Select 'Management Acess'
- You will be taken to the AWS Console in a new tab.

### AWS CLI credentials

To fetch AWS CLI credentials:
- Go to the AWS SSO login endpoint [here]({{ site.aws.login_url }}).
- Login with your Google account
- Select the appropriate account for {{ site.repo.name }}.
- Select 'Command line or programmatic access'
- Under 'Option 1', click the set of environment variables to copy them to your clipboard.
- In a terminal window, paste what's on your clipboard and click Enter.
- Your AWS CLI should now be able to authenticate to AWS; try `aws s3 ls` to test.  No failures indicate a successfully authenticated AWS CLI.