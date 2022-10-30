import { Bucket, Config, StackContext } from "@serverless-stack/resources";
import { RemovalPolicy } from "aws-cdk-lib";

export function Uploads({ stack }: StackContext) {
  const bucket = new Bucket(stack, "attachments", {
    cdk: {
      bucket: {
        autoDeleteObjects: true,
        removalPolicy: RemovalPolicy.DESTROY,
      },
    },
  });

  return {
    bucket,
  };
}
