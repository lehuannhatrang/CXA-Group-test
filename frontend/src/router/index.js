import React from "react";
import { Redirect } from "react-router-dom";
import homeRoutes from "./HomeRoutes";
import notFoundRoutes from "./404";
import searchRoutes from "./SearchRoute"
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
    component: () => <Redirect to="/404" />
  }
];

const routes = [
  ...redirectRoute,
  ...homeRoutes,
  ...searchRoutes,
  ...notFoundRoutes,
  ...errorRoute,
];

export default routes;
