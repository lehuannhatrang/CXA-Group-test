import CoreLoadable from "./coreLoadable";

const MovieDetails = CoreLoadable({
  loader: () => import("../views/movieDetails")
})

const DetailRoutes = [
  {
    path: "/movie/:movieId",
    component: MovieDetails,
    exact: true
  }
];

export default DetailRoutes;
