---
layout: default
title: database
parent: Services
---

# database
{: .no_toc }

#### Summary

Deploys a DynamoDB table to hold user submitted data, and a DynamoDB stream for later integration.

#### Notes

- The DynamoDB table is written to by the Lambda functions backing the API GW deployed by the app-api service.
- The DynamoDB stream is created, with both old and new images.
- The stream-function service will use this stream as a source to run business logic on each database change.