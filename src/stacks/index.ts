import { App } from "@serverless-stack/resources";
import { Database } from "./Database";
import { Uploads } from "./Uploads";
import { Api } from "./Api";
import { Ui } from "./Ui";
import { Auth } from "./Auth";
import { Frontend } from "./Frontend";

export default function main(app: App) {
  app.setDefaultFunctionProps({
    runtime: "nodejs16.x",
    srcPath: "src/services",
    bundle: {
      format: "esm",
    },
  });
  app.setDefaultRemovalPolicy("destroy");
  app
    .stack(Database)
    .stack(Uploads)
    .stack(Api)
    .stack(Ui)
    .stack(Auth)
    .stack(Frontend);
}
