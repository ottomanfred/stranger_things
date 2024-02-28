import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Feed />,
      },
      {
        path: "/login",
        element: <LoginForm />,
      },
      {
        path: "/:id",
        element: <SinglePost />,
      },
    ],
  },
]);

export default router;
