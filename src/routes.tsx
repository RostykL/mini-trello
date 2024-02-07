import { createBrowserRouter } from "react-router-dom";
import Boards from "src/pages/Boards";
import Layout from "src/components/Layout";
import Board from "src/pages/Board";

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
