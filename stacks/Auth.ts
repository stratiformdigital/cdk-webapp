import { Config, StackContext, use, Cognito } from "@serverless-stack/resources";
import { Api } from "./Api";
import { Database } from "./Database";
import { Uploads } from "./Uploads";
import * as cognito from "@aws-cdk/aws-cognito";


export function Auth({ stack }: StackContext) {
  const api = use(Api);
  const db = use(Database);
  const uploads = use(Uploads);
  const auth = new Cognito(stack, "auth", {
    login: ["email"],
    cdk: {
      userPoolClient: {
        generateSecret: false
      }
    }
  });
  // Allow authenticated users invoke API
  auth.attachPermissionsForAuthUsers(stack, [
    api,
    db.amendmentsTable,
    uploads.bucket,
  ]);



  stack.addOutputs({
    UserPoolId: auth.userPoolId,
    UserPoolClientId: auth.userPoolClientId,
    IdentityPoolId: auth.cognitoIdentityPoolId,
    // UserPoolClientDomain: auth.userPoolClientDomain,
  });

  return {
  };
}
