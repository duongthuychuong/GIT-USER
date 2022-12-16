import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { GithubProvider } from "./context/context";
import { Auth0Provider } from "@auth0/auth0-react";
// dev-jc62e0k1on4sbsux.us.auth0.com
// uWDF7yhR0tLVsP3UExpWyY4ZgmbiPR8B
// BwMWnQoddeQJ6Ult3WZxQBecfOi0QAH9c6jEVtHxc5L2-H7B_gi_J5mhfDKvXkCo

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GithubProvider>
      <App />
    </GithubProvider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
