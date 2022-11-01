import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import NewAmendment from "./containers/NewAmendment";
import Amendments from "./containers/Amendments";
import Profile from "./containers/Profile";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import { s3AmplifyUpload, s3AmplifyGetURL } from "./libs/awsLib";

export default function Routes() {
  // This might not be quite the right place for it, but I'm doing
  // dependency injection here, on the component level.
  let s3Upload = s3AmplifyUpload;
  let s3URLResolver = s3AmplifyGetURL;

  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <AuthenticatedRoute exact path="/profile">
        <Profile />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/amendments/new">
        <NewAmendment fileUpload={s3Upload} />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/amendments/:id">
        <Amendments fileUpload={s3Upload} fileURLResolver={s3URLResolver} />
      </AuthenticatedRoute>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}
