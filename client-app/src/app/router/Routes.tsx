import { createBrowserRouter, RouteObject } from "react-router-dom";
import App from "../Layout/App";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
  },
];

export const router = createBrowserRouter(routes);
