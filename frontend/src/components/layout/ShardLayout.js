import CoreLoadable from "../../router/coreLoadable";

const Layout1 = CoreLoadable({
  loader: () => import("./Layout1")
});

export const ShardLayout = {
  layout1: Layout1
}