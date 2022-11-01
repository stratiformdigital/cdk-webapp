---
layout: default
title: Overview
nav_order: 2
---

# Overview
{: .no_toc }

A 10,000' view of the project.
{: .fs-6 .fw-300 }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Overview

The {{ site.repo.name }} project is a template for a serverless, cloud native, form submission application. A react frontend is presented to the user by way of S3 and Cloudfront.  Users submit form data and blob uploads (PDFs, etc.) to the application.  Form data goes directly to an API Gateway backed by lambda, and blob data goes directly to an S3 bucket where it is virus scanned.  A DynamoDB Stream, a Lambda, and SES are used to send confiration of user submission.  All of this is protected by AWS Cognito.

The actual application is fairly 'hello world', but the repository support and configuration is full featured. This is by design, to allow for simpler project creation from the template.  Full CI/CD support with GitHub Actions, automated security scanning, docs site in GitHub Pages, PR/Issue templates, infrastructure and application deployment workflows, etc. is all included.

## Architecture

The deployed architecture can sometimes best be described with a diagram:

![diagram](../../../assets/diagram.svg)
