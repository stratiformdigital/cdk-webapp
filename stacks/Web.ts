import { Config, StackContext, use } from "@serverless-stack/resources";
import { Auth } from "./Auth";
import { Api } from "./Api";
import { Ui } from "./Ui";
import { Uploads } from "./Uploads";
import { exec } from "child_process";
import * as deploy from 'aws-cdk-lib/aws-s3-deployment';

export async function Web({ stack }: StackContext) {
  const api = use(Api);
  const auth = use(Auth);
  const ui = use(Ui);
  const uploads = use(Uploads);
  console.log(api.api.url);
  await exec("mkdir services/frontend/build", {
    cwd: "services/frontend",
  });
  await exec("yarn install", {
    cwd: "services/frontend",
  });
  await exec("yarn run build", {
    cwd: "services/frontend",
    env: {
      REACT_APP_API_REGION: "____placeholder____",
      REACT_APP_API_URL: "____placeholder____",
      REACT_APP_COGNITO_REGION: "____placeholder____",
      REACT_APP_COGNITO_IDENTITY_POOL_ID: "____placeholder____",
      REACT_APP_COGNITO_USER_POOL_ID: "____placeholder____",
      REACT_APP_COGNITO_USER_POOL_CLIENT_ID: "____placeholder____",
      REACT_APP_COGNITO_USER_POOL_CLIENT_DOMAIN: "____placeholder____",
      REACT_APP_COGNITO_REDIRECT_SIGNIN: "____placeholder____",
      REACT_APP_COGNITO_REDIRECT_SIGNOUT: "____placeholder____",
      REACT_APP_S3_ATTACHMENTS_BUCKET_REGION: "____placeholder____",
      REACT_APP_S3_ATTACHMENTS_BUCKET_NAME: "____placeholder____",

      // REACT_APP_API_REGION: "us-east-1", // will come back
      // REACT_APP_API_URL: api.api.url,
      // REACT_APP_COGNITO_REGION: "us-east-1", // come back
      // REACT_APP_COGNITO_IDENTITY_POOL_ID: auth.auth.cognitoIdentityPoolId,
      // REACT_APP_COGNITO_USER_POOL_ID: auth.auth.userPoolId,
      // REACT_APP_COGNITO_USER_POOL_CLIENT_ID: auth.auth.userPoolClientId,
      // REACT_APP_COGNITO_USER_POOL_CLIENT_DOMAIN: auth.domain.domainName,
      // REACT_APP_COGNITO_REDIRECT_SIGNIN: ui.application_endpoint_url,
      // REACT_APP_COGNITO_REDIRECT_SIGNOUT: ui.application_endpoint_url,
      // REACT_APP_S3_ATTACHMENTS_BUCKET_REGION: "us-east-1", //will come back
      // REACT_APP_S3_ATTACHMENTS_BUCKET_NAME: uploads.bucket.bucketName,
    }
  });

  const deployment = new deploy.BucketDeployment(stack, "Deployment", {
    sources: [deploy.Source.asset("services/frontend/build")],
    destinationBucket: ui.bucket,
    distribution: ui.distribution,
    distributionPaths: ["/*"]
  });

  stack.addOutputs({
    SITE: ui.application_endpoint_url,
  });

  return {};
}


function execSync(arg0: string, arg1: { cwd: string; stdio: string; env: { [key: string]: string | undefined; TZ?: string | undefined; }; }) {
  throw new Error("Function not implemented.");
}
// region: ${env:REGION_A}
// api_region: ${app-api.Region}
// api_url: ${app-api.ApiGatewayRestApiUrl}
// cognito_region: ${ui-auth.Region}
// cognito_identity_pool_id: ${ui-auth.IdentityPoolId}
// cognito_user_pool_id: ${ui-auth.UserPoolId}
// cognito_user_pool_client_id: ${ui-auth.UserPoolClientId}
// cognito_user_pool_client_domain: ${ui-auth.UserPoolClientDomain}
// s3_attachments_bucket_region: ${uploads.Region}
// s3_attachments_bucket_name: ${uploads.AttachmentsBucketName}
// ui_s3_bucket_name: ${ui.S3BucketName}
// ui_cloudfront_distribution_id: ${ui.CloudFrontDistributionId}
// application_endpoint_url: ${ui.ApplicationEndpointUrl}
