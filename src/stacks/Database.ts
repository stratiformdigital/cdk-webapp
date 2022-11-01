import { Config, StackContext, Table } from "@serverless-stack/resources";
import { RemovalPolicy } from "aws-cdk-lib";

export function Database({ stack }: StackContext) {
  const amendmentsTable = new Table(stack, "amendments", {
    fields: {
      userId: "string",
      amendmentId: "string",
    },
    primaryIndex: {
      partitionKey: "userId",
      sortKey: "amendmentId",
    },
    stream: "new_and_old_images",
  });

  const amendmentsAtomicCounterTable = new Table(stack, "amendments-atomic-counter", {
    fields: {
      id: "string",
    },
    primaryIndex: {
      partitionKey: "id",
    },
  });

  return {
    amendmentsTable,
    AMENDMENTS_TABLE_NAME: new Config.Parameter(stack, "AMENDMENTS_TABLE_NAME", {
      value: amendmentsTable.tableName,
    }),
    amendmentsAtomicCounterTable,
    AMENDMENTS_ATOMIC_COUNTER_TABLE_NAME: new Config.Parameter(stack, "AMENDMENTS_ATOMIC_COUNTER_TABLE_NAME", {
      value: amendmentsAtomicCounterTable.tableName,
    }),
  };
}
