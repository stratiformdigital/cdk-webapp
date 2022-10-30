import { Bucket, Config, StackContext } from "@serverless-stack/resources";
import { RemovalPolicy } from "aws-cdk-lib";
import * as iam from 'aws-cdk-lib/aws-iam';

export function Uploads({ stack }: StackContext) {
  const bucket = new Bucket(stack, "attachments", {
    cdk: {
      bucket: {
        autoDeleteObjects: true,
        removalPolicy: RemovalPolicy.DESTROY,
      },
    },
  });
  bucket.attachPermissions(
    [
      new iam.PolicyStatement({
        effect: iam.Effect.DENY,
        principals: [
          new iam.ServicePrincipal("*")
        ],
        actions: ['s3:PutObject'],
        resources: [
          `${bucket.bucketArn}/*.png`,
          `${bucket.bucketArn}/*.gif`,
          `${bucket.bucketArn}/*.jpeg`,
          `${bucket.bucketArn}/*.bmp`,
          `${bucket.bucketArn}/*.csv`,
          `${bucket.bucketArn}/*.doc`,
          `${bucket.bucketArn}/*.docx`,
          `${bucket.bucketArn}/*.odp`,
          `${bucket.bucketArn}/*.ods`,
          `${bucket.bucketArn}/*.odt`,
          `${bucket.bucketArn}/*.pdf`,
          `${bucket.bucketArn}/*.ppt`,
          `${bucket.bucketArn}/*.pptx`,
          `${bucket.bucketArn}/*.rtf`,
          `${bucket.bucketArn}/*.tif`,
          `${bucket.bucketArn}/*.tiff`,
          `${bucket.bucketArn}/*.txt`,
          `${bucket.bucketArn}/*.xls`,
          `${bucket.bucketArn}/*.xlsx`,
        ],
      }),
    ]
  );
  return {
    bucket,
  };
}
