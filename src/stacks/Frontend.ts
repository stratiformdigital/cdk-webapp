import { Config, StackContext, use , ReactStaticSite } from "@serverless-stack/resources";
import { Auth } from "./Auth";
import { Api } from "./Api";
import { Ui } from "./Ui";
import { Uploads } from "./Uploads";
import { exec } from "child_process";
import * as deploy from 'aws-cdk-lib/aws-s3-deployment';

export async function Frontend({ stack }: StackContext) {
  const api = use(Api);
  const auth = use(Auth);
  const ui = use(Ui);
  const uploads = use(Uploads);
  
  var site = new ReactStaticSite(stack, "ReactSite", {
    path: "src/services/frontend",
    environment: {
      REACT_APP_API_REGION: "us-east-1", // will come back
      REACT_APP_API_URL: api.api.url,
      REACT_APP_COGNITO_REGION: "us-east-1", // come back
      REACT_APP_COGNITO_IDENTITY_POOL_ID: auth.auth.cognitoIdentityPoolId,
      REACT_APP_COGNITO_USER_POOL_ID: auth.auth.userPoolId,
      REACT_APP_COGNITO_USER_POOL_CLIENT_ID: auth.auth.userPoolClientId,
      REACT_APP_COGNITO_USER_POOL_CLIENT_DOMAIN: `${auth.domain.domainName}.auth.us-east-1.amazoncognito.com`,
      REACT_APP_COGNITO_REDIRECT_SIGNIN: ui.application_endpoint_url,
      REACT_APP_COGNITO_REDIRECT_SIGNOUT: ui.application_endpoint_url,
      REACT_APP_S3_ATTACHMENTS_BUCKET_REGION: "us-east-1", //will come back
      REACT_APP_S3_ATTACHMENTS_BUCKET_NAME: uploads.bucket.bucketName,
    },
    cdk: {
      bucket: ui.bucket
    }
  });

  stack.addOutputs({
    SITE: ui.application_endpoint_url,
  });

  return {};
}
