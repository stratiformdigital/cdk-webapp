---
layout: default
title: ui
parent: Services
---

# ui
{: .no_toc }

#### Summary

The application's frontend is static code served from an S3 bucket fronted by a Cloudfront distribution.  This service creates that bucket and the cloudfront distro.

#### Notes

- The CloudFront distribution is given an Origin Access Identity (OAI).  The S3 bucket is configured to only allow access from that OAI.  In this way, we prevent direct access to the S3 bucket.