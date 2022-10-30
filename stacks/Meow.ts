import { Config, StackContext, Table, Bucket } from "@serverless-stack/resources";
import { RemovalPolicy } from "aws-cdk-lib";

export function Meow({ stack }: StackContext) {
  const fffff = new Bucket(stack, "aaaaawefvazxcvghgqerf", {
    cdk: {
      bucket: {
        autoDeleteObjects: true,
        removalPolicy: RemovalPolicy.DESTROY,
      },
    },
  });

  return {
    asdf: "asdf",
  };
}
