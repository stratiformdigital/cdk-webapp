import {
  Config,
  StackContext,
  use,
  Cognito,
} from "@serverless-stack/resources";
import { Api } from "./Api";
import { Database } from "./Database";
import { Uploads } from "./Uploads";
import { Ui } from "./Ui";
import * as cognito from "aws-cdk-lib/aws-cognito";

export function Auth({ stack }: StackContext) {
  const api = use(Api);
  const db = use(Database);
  const uploads = use(Uploads);
  const ui = use(Ui);
  const auth = new Cognito(stack, "auth", {
    login: ["email"],
    cdk: {
      userPool: {
        standardAttributes: {
          givenName: {
            required: true,
            mutable: true,
          },
          familyName: {
            required: true,
            mutable: true,
          },
          phoneNumber: {
            required: false,
            mutable: true,
          },
        },
      },
      userPoolClient: {
        generateSecret: false,
        oAuth: {
          flows: {
            authorizationCodeGrant: true,
          },
          callbackUrls: ["http://localhost:3000/", ui.application_endpoint_url],
          logoutUrls: ["http://localhost:3000/", ui.application_endpoint_url],
          scopes: [
            cognito.OAuthScope.EMAIL,
            cognito.OAuthScope.OPENID,
            cognito.OAuthScope.COGNITO_ADMIN,
          ],
        },
      },
    },
  });
  // Allow authenticated users invoke API
  auth.attachPermissionsForAuthUsers(stack, [
    api.api,
    db.amendmentsTable,
    uploads.bucket,
  ]);
  const userPool: cognito.IUserPool = {
    userPoolId: auth.userPoolId,
    stack,
  };
  console.log(stack.stackName);
  const domain = new cognito.UserPoolDomain(stack, "domain", {
    userPool: userPool,
    cognitoDomain: {
      domainPrefix: stack.stackName.toLowerCase(),
    },
  });

  stack.addOutputs({
    UserPoolId: auth.userPoolId,
    UserPoolClientId: auth.userPoolClientId,
    IdentityPoolId: auth.cognitoIdentityPoolId,
    // UserPoolClientDomain: auth.userPoolClientDomain,
  });

  return {
    auth,
    domain,
  };
}
