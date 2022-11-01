---
layout: default
title: ui-src
parent: Services
---

# ui-src
{: .no_toc }

#### Summary

This service deploys no AWS infrastructure, but rather builds the application's React code and uploads it to the appropriate S3 bucket.

#### Notes

- The frontend UI code requires many environment specific values.  For instance, it needs to know the API GW url and the uploads bucket name.  These and many more are resolved at deploy time, injected via environment variables, and the React package is built.
- The code is then uploaded to the ui service's S3 bucket.
- Since the code is served via Cloudfront whose files have a TTL, we trigger a cache expiry of all objects.
