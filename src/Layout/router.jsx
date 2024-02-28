import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Feed from "../features/Feed/Feed";
import AuthForm from "../features/Login/AuthForm";
/*import SinglePost from "../features/Feed/SinglePost/SinglePost";*/

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
        element: <AuthForm />,
      },
      /*{
        path: "/:id",
        element: <SinglePost />,
      },*/
    ],
  },
]);

export default router;
