import React from "react";
import { Redirect } from "react-router-dom";
import homeRoutes from "./HomeRoutes";

// import loggingRoutes from "./views/logging/LoggingRoutes"

const redirectRoute = [
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/home" />
  },
];

const errorRoute = [
  {
    component: () => <Redirect to="/session/404" />
  }
];

const routes = [
  ...redirectRoute,
  ...homeRoutes,
  ...errorRoute,
];

export default routes;
