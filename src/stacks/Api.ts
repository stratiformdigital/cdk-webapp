import {
  StackContext,
  use,
  Api as ApiGateway,
  Config,
} from "@serverless-stack/resources";
import { Database } from "./Database";

export function Api({ stack }: StackContext) {
  const db = use(Database);

  const api = new ApiGateway(stack, "api", {
    defaults: {
      authorizer: "iam",
      function: {
        permissions:[
          db.amendmentsTable,
          db.amendmentsAtomicCounterTable,
        ],
        environment: {
          tableName: db.amendmentsTable.tableName,
          atomicCounterTableName: db.amendmentsAtomicCounterTable.tableName,
          dynamoRegion: "us-east-1", // lol I'll come back

        },
      },
    },
    routes: {
      "POST /amendments": "functions/create.main",
      "GET /amendments/{id}": "functions/get.main",
      "GET /amendments": "functions/list.main",
      "PUT /amendments/{id}": "functions/update.main",
      "DELETE /amendments/{id}": "functions/delete.main",

    },
  });

  new Config.Parameter(stack, "API_URL", {
    value: api.url,
  });

  stack.addOutputs({
    API: api.url,
  });

  return {
    api,
    api_url: api.url
  };
}
