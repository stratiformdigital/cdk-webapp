---
layout: default
title: stream-functions
parent: Services
---

# stream-functions
{: .no_toc }

#### Summary

The stream-functions service sends a confirmation email to the user for each user event.

#### Notes

- A lambda function is deployed by the service.
- The lambda is given permissions to read the DynamoDB stream deployed by the database service.
- The database stream is set as the lambda's event trigger.
- For each change in the database, the lambda fires.  It receives old and new dynamodb records, whichever are applicable; with this information, it formats a confirmation email to send the submitter, something like "We got your APS Submission.  Thank you."
- The Lambda function uses Amazon SES to send the email.
- The actual usability of this service is highly dependent on Account specific SES settings.  If your account is not out of the SES Sandbox, you will not be able to send emails to non verified addresses, effectively making this service non functional.  There's no cost to get out of the SES Sandbox, but you must request access through the console.