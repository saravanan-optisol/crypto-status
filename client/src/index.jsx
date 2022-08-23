import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import "raf/polyfill";
import "./styles.scss";

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { history } from "./stores/_helpers/history";
import rootStore from "./stores/rootStore";
import App from "./views/App";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import "react-bootstrap-typeahead/css/Typeahead.css";

(async window => {
  const initialState = {};
  const store = rootStore(initialState, history);

  const rootEl = document.getElementById("root");
  const render = (Component, el) => {
    ReactDOM.render(
      <Provider store={store}>
        <Component history={history} dispatch={store.dispatch} />
      </Provider>,
      el
    );
  };

  render(App, rootEl);
})(window);
