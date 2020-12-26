import CoreLoadable from "./coreLoadable";

const NotFound = CoreLoadable({
  loader: () => import("../views/404")
})

const notFoundRoutes = [
  {
    path: "/404",
    component: NotFound,
  }
];

export default notFoundRoutes;
