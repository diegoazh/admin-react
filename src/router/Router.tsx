import { createBrowserRouter } from 'react-router-dom';
import { RouteGuard } from '../components/RouteGuard';
import { ErrorPage } from '../layouts/ErrorPage';
import { MainLayout } from '../layouts/MainLayout';
import { UsersList } from '../pages';
export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            path: 'users',
            element: (
              <RouteGuard>
                <UsersList />
              </RouteGuard>
            ),
          },
        ],
      },
    ],
  },
]);
