import { Navigate, createBrowserRouter } from "react-router-dom";
import Layout from "./layout/DefaultLayout";
import Home from "./views/Home";
import Parents from "./views/parent/Parents";
import Settings from "./views/Settings";
import AddParent from "./views/parent/AddParent";
import EditParent from "./views/parent/EditParent";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
        {
          path: '/',
          element: <Navigate to='/home' />
        },
        {
          path: '/home',
          element: <Home />
        },
        {
          path: '/parents',
          element: <Parents />
        },
        // {
        //   path: '/teachers',
        //   element: <Teachers />
        // },
        {
          path: '/settings',
          element: <Settings />
        },
        {
          path: '/parents/add',
          element: <AddParent />
        },
        {
          path: '/parents/edit/:id',
          element: <EditParent />
        },

    ]
  },
  {
    path: '*',
    element: <> Page Not Found</>
  },

]);

export default router;
