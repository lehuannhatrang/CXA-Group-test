import Loadable from "react-loadable";
import Loading from "../components/Loading";

const CoreLoadable = opts => {
  return Loadable(
    Object.assign(
      {
        loading: Loading,
        delay: 100,
        timeout: 10000
      },
      opts
    )
  );
};

export default CoreLoadable;
