import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Flowbite } from "flowbite-react";
import { Toaster } from "react-hot-toast";

import "react-loading-skeleton/dist/skeleton.css";
import "./styles/index.css";

import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./store/reducers/rootReducer";

const store = createStore(rootReducer, compose(applyMiddleware(thunk)));
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Provider store={store}>
      <Flowbite>
        <App />
        <Toaster />
      </Flowbite>
    </Provider>
  </Router>
);
