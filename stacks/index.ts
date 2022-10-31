import { App } from "@serverless-stack/resources";
import { Database } from "./Database";
import { Uploads } from "./Uploads";
import { Api } from "./Api";
import { Auth } from "./Auth";
import { Ui } from "./Ui";
import { Web } from "./Web";

export default function main(app: App) {
  app.setDefaultFunctionProps({
    runtime: "nodejs16.x",
    srcPath: "services",
    bundle: {
      format: "esm",
    },
  });
  app.setDefaultRemovalPolicy("destroy");
  app.stack(Database).stack(Uploads).stack(Api).stack(Ui).stack(Auth).stack(Web);
}
