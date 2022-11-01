---
layout: default
title: ui-waf
parent: Services
---

# ui-waf
{: .no_toc }

#### Summary

The ui-waf service builds a Web Application Firewall (WAF) to protect the ui service's Cloudfront distribution.

#### Notes

- The WAF WebACLs that are attached work to basically only allow traffic from the United States of America and its territories.
- The attachement of the WAF to the Cloudfront distribution is a bit akward, and is currently done as a post deploy hook in the serverless.yml file.