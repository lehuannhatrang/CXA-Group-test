import CoreLoadable from "./coreLoadable";

const Search = CoreLoadable({
  loader: () => import("../views/search")
})

const searchRoutes = [
  {
    path: "/search/:keyword",
    component: Search,
    exact: true
  }
];

export default searchRoutes;
