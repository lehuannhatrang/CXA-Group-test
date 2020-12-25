import CoreLoadable from "./coreLoadable";

const Home = CoreLoadable({
  loader: () => import("../views/home")
})

const homeRoutes = [
  {
    path: "/home",
    component: Home,
  }
];

export default homeRoutes;
