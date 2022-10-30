import { Config, StackContext } from "@serverless-stack/resources";
import * as ec2 from 'aws-cdk-lib/aws-ec2';
// import * as cdk from 'aws-cdk-lib';
export function Vpc({ stack }: StackContext) {
  const vpc = new ec2.Vpc(stack, 'vpc', {
    cidr: '10.0.0.0/16',
    natGateways: 1,
    maxAzs: 3,
    subnetConfiguration: [
      {
        name: 'private-subnet-1',
        subnetType: ec2.SubnetType.PRIVATE_WITH_NAT,
        cidrMask: 24,
      },
      {
        name: 'public-subnet-1',
        subnetType: ec2.SubnetType.PUBLIC,
        cidrMask: 24,
      },
      {
        name: 'isolated-subnet-1',
        subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
        cidrMask: 28,
      },
    ],
  });

  return {
    vpc,
    // TABLE_NAME: new Config.Parameter(stack, "TABLE_NAME", {
    //   value: table.tableName,
    // }),
  };
}
