---
layout: default
title: app-api
parent: Services
---

# app-api
{: .no_toc }

#### Summary

The app-api service deploys the application's API Gateway backed by Lambda functions.

#### Notes

- Setting aside the Web Application Firewall (WAF) explained further on, the API Gateway is publicly accessible on the internet.  That is, anyone can reach it at the network level.  AWS Cognito, deployed by the ui-auth service, is what allows us to host a publicly accessible API but only allow authenticated and authorized users access.
- There are five resources deployed to the api, each backed by a lambda function:
  - create:  Creates a new submission
  - get:  Gets a submission's data, given the id.
  - list:  Lists submissions in the database
  - update:  Updates an existing submission
  - delete:  Deletes a submission
- Any required permissions, such as DynamoDB permissions, are attached to the lambda functions using an IAM role.
- Some standard WAF ACL rules are attached to the APIGW, which essentially only allow traffic from the United States of America and its territories.
