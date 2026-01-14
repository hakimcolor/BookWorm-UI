import { createBrowserRouter } from 'react-router';
import Root from '../Layout/Root';
import HOme from '../Pages/User/HOme';
import ManageBook from '../Pages/Admin/ManageBook';
import AdminDashbord from '../Pages/Admin/AdminDashbord';
import ManageGenress from '../Pages/Admin/ManageGenress';
import ManageTutorials from '../Pages/Admin/ManageTutorials';
import ManageUsers from '../Pages/Admin/ManageUsers';
import ModerateReviews from '../Pages/Admin/ModerateReviews';
import UserRoot from '../Layout/UserRoot';
import BrowseBooksPage from '../Pages/User/BrowseBooksPage';
import DetailsBookpage from '../Pages/User/DetailsBookpage';
import MyLibrary from '../Pages/User/MyLibrary';
import Recomendations from '../Pages/User/Recomendations';
import Tutorials from '../Pages/User/Tutorials';
export const router = createBrowserRouter([
  {
    path: '/admin',
    element: <Root />,
    children: [
      {
        index: true,
        element: <AdminDashbord />,
      },
      {
        path: 'managebook',
        element: <ManageBook />,
      },

      {
        path: 'managegenress',
        element: <ManageGenress />,
      },
      {
        path: 'managetutorials',
        element: <ManageTutorials />,
      },
      {
        path: 'manageusers',
        element: <ManageUsers />,
      },
      {
        path: 'moderatereviews',
        elementk: <ModerateReviews />,
      },
    ],
  },
  {
    path: '/',
    element: <UserRoot />,
    children: [
      {
        index: true,
        element: <HOme />,
      },
      {
        path: 'browsebookspage',
        element: <BrowseBooksPage />,
      },
      {
        path: 'detailsbookpage/:id',
        element: <DetailsBookpage />,
      },
      {
        path: 'mylibrary',
        element: <MyLibrary />,
      },
      {
        path: 'recomendations',
        element: <Recomendations />,
      },
      {
        path: 'tutorials',
        element: <Tutorials />,
      },
    ],
  },
]);
