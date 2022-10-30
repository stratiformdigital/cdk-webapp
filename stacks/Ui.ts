import { Config, StackContext, Bucket } from "@serverless-stack/resources";
import * as s3 from "aws-cdk-lib/aws-s3"
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins"
import { RemovalPolicy } from "aws-cdk-lib";


export function Ui({ stack }: StackContext) {

  const bucket = new s3.Bucket(stack, 'frontendbucket', {
    autoDeleteObjects: true,
    removalPolicy: RemovalPolicy.DESTROY,
  });
  const response403: cloudfront.ErrorResponse = {
    httpStatus: 403,
    responseHttpStatus: 403,
    responsePagePath: '/index.html',
  };
  const dist =new cloudfront.Distribution(stack, 'frontenddist', {
    defaultBehavior: { 
      origin: new origins.S3Origin(bucket) ,
      viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
    },
    defaultRootObject: "index.html",
    errorResponses: [
      response403,
    ]
  });

  return {
  };
}
