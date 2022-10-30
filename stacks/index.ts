// import { App } from "@serverless-stack/resources";
// import { Api } from "./Api";
// import { Web } from "./Web";
// import { Vpc } from "./Vpc";
import { Database } from "./Database";
// import { Meow } from "./Meow";

export default function main(app: App) {
  app.setDefaultFunctionProps({
    runtime: "nodejs16.x",
    srcPath: "services",
    bundle: {
      format: "esm",
    },
  });
  app.stack(Database);
  // .stack(Meow)
  //.stack(Vpc);
}
