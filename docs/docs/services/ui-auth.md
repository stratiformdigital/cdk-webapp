---
layout: default
title: ui-auth
parent: Services
---

# ui-auth
{: .no_toc }

#### Summary

Deploys an AWS Cognito User Pool and Identity Pool, used as the authentication and authorization scheme for the application.

#### Notes

- AWS Cognito is used to manage users and grant access to AWS resources.
- This application consists of a static frontend served through Cloudfront, and API built in APIGW, and a user uploads bucket access directly in S3.  The API and S3 requiring protection, and this is where Cognito is used.
- An identity and user pool are created.
- A role for authenticated users is created, granting access to the APIGW and the uploads S3 bucket.
- For this project, user sign up is allowed.