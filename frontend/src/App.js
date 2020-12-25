import React from "react";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { createBrowserHistory } from 'history';

import routes from "./router";
import { Store } from "./redux/Stores";
import {Auth, AuthGuard} from "./middleware";
import Layout from "./components/layout";
import AppContext from "./appContext"

const App = () => {
  return (
    <AppContext.Provider value={{ routes }}>
      <Provider store={Store}>
          <Auth>
            <Router history={createBrowserHistory()}>
              <AuthGuard>
                <Layout />
              </AuthGuard>
            </Router>
          </Auth>
      </Provider>
    </AppContext.Provider>
  );
};

export default App;

