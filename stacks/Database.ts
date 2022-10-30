import { Config, StackContext, Table } from "@serverless-stack/resources";
import { RemovalPolicy } from "aws-cdk-lib";

export function Database({ stack }: StackContext) {
  const table = new Table(stack, "amendments", {
    fields: {
      userId: "string",
      amendmentId: "string",
    },
    primaryIndex: {
      partitionKey: "userId",
      sortKey: "amendmentId",
    },
    cdk: {
      table: {
        removalPolicy: RemovalPolicy.DESTROY,
      }
    }
  });

  return {
    table,
    TABLE_NAME: new Config.Parameter(stack, "TABLE_NAME", {
      value: table.tableName,
    }),
  };
}
