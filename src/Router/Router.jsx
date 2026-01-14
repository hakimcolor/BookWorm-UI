import { createBrowserRouter } from 'react-router';
import Root from '../Layout/Root';
import HOme from '../Pages/User/HOme';
import ManageBook from '../Pages/Admin/ManageBook';
import AdminDashbord from '../Pages/Admin/AdminDashbord';
import ManageGenress from '../Pages/Admin/ManageGenress';
import ManageTutorials from '../Pages/Admin/ManageTutorials';
import ManageUsers from '../Pages/Admin/ManageUsers';
import ModerateReviews from '../Pages/Admin/ModerateReviews';
import BrowseBooksPage from '../Pages/User/BrowseBooksPage';
import DetailsBookpage from '../Pages/User/DetailsBookpage';
import MyLibrary from '../Pages/User/MyLibrary';
import Recomendations from '../Pages/User/Recomendations';
import Tutorials from '../Pages/User/Tutorials';
import SignUp from '../Pages/SingUP';
import SignIn from '../Pages/SingIn';
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';


export const router = createBrowserRouter([
  // Admin Routes
  {
    path: '/admin',
    element: <Root />,
    children: [
      {
        index: true,
        element: (
          <AdminRoute>
            <AdminDashbord />
          </AdminRoute>
        ),
      },
      {
        path: 'managebook',
        element: (
          <AdminRoute>
            <ManageBook />
          </AdminRoute>
        ),
      },
      {
        path: 'managegenress',
        element: (
          <AdminRoute>
            <ManageGenress />
          </AdminRoute>
        ),
      },
      {
        path: 'managetutorials',
        element: (
          <AdminRoute>
            <ManageTutorials />
          </AdminRoute>
        ),
      },
      {
        path: 'manageusers',
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: 'moderatereviews',
        element: (
          <AdminRoute>
            <ModerateReviews />
          </AdminRoute>
        ),
      },
    ],
  },

  // User Routes (Protected)
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <HOme />
          </PrivateRoute>
        ),
      },
      {
        path: 'browsebookspage',
        element: (
          <PrivateRoute>
            <BrowseBooksPage />
          </PrivateRoute>
        ),
      },
      {
        path: 'detailsbookpage/:id',
        element: (
          <PrivateRoute>
            <DetailsBookpage />
          </PrivateRoute>
        ),
      },
      {
        path: 'mylibrary',
        element: (
          <PrivateRoute>
            <MyLibrary />
          </PrivateRoute>
        ),
      },
      {
        path: 'recomendations',
        element: (
          <PrivateRoute>
            <Recomendations />
          </PrivateRoute>
        ),
      },
      {
        path: 'tutorials',
        element: (
          <PrivateRoute>
            <Tutorials />
          </PrivateRoute>
        ),
      },
    ],
  },

  // Public Routes
  { path: 'signup', element: <SignUp /> },
  { path: 'signin', element: <SignIn /> },
  { path: 'admin/signup', element: <SignUp /> },
]);
