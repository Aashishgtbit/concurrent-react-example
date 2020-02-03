import React from "react";
import { Route, BrowserRouter, HashRouter, Switch } from "react-router-dom";
import App from "../App";
import UserProfile from "../components/UserProfile";

const routesConfig = [
  {
    path: "/",
    component: App,
    name: "Home Page"
  },
  {
    path: "/:userId",
    component: UserProfile
  }
];

export default function Routes() {
  return (
    <HashRouter>
      <Switch>
        {routesConfig.map(config => {
          return (
            <Route
              exact
              key={config.name}
              path={config.path}
              render={({ history, match, location }) => (
                <config.component
                  history={history}
                  match={match}
                  location={location}
                />
              )}
            />
          );
        })}
      </Switch>
    </HashRouter>
  );
}
