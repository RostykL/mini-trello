import { createBrowserRouter } from "react-router-dom";
import Boards from "src/Pages/Boards";
import Layout from "src/components/Layout";
import Board from "src/Pages/Board";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Boards />,
      },
      {
        path: "/board/:id",
        element: <Board />,
      },
    ],
  },
]);
