---
layout: default
title: uploads
parent: Services
---

# uploads
{: .no_toc }

#### Summary

The uploads service creates an S3 bucket for user submitted binary data (like PDF uploads).  It also deploys an event driven virus scanner for uploaded files based around ClamAV.

#### Notes

- The S3 bucket is what will hold user submitted PDFs, JPGs, etc.
- The S3 bucket will be directly accessed by users of our application, for performance and scalability reasons.  Access to this bucket will be granted through an IAM role assumed through AWS Cognito (deployed by the ui-auth service).
- An S3 Bucket Notification configuration is added for PUT events.  When a new object is PUT, a lambda function is triggered.
- That lambda function works to run the ClamAV virus scanner against the just-uploaded file.  If the file is found to be safe, it is tagged as CLEAN.  If it's not found to be safe, it's tagged as DIRTY.
- The IAM role users inherit from Cognito only allows S3 GET operations against files that are tagged CLEAN.  In this way, we prevent users from every downloading a file before it is deemed safe.
- There's another lambda function and another bucket, seperate from those detailed above, that work to keep the ClamAV virus definitions up to date.
