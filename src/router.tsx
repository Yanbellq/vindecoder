import { createBrowserRouter } from 'react-router';
import Layout from './components/layout/Layout';
import HomePage from './pages/home/HomePage';
import VariablesPage from './pages/variables/VariablesPage';
import VariableDetailPage from './pages/variable-detail/VariableDetailPage';
import { ROUTES } from './constants';
import NotFound from './pages/not-found/NotFoundPage';
import { queryClient } from './lib';
import RouteError from './components/error/RouteError';
import {
  getVariableDetailQueryOptions,
  getVariableListQueryOptions,
} from './hooks/queries';

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    Component: Layout,
    errorElement: <RouteError />,
    children: [
      { index: true, Component: HomePage },
      {
        path: ROUTES.VARIABLES,
        Component: VariablesPage,
        HydrateFallback: () => (
          <div style={{ color: 'var(--text-muted)', padding: '2rem' }}>
            Loading registry...
          </div>
        ),
        loader: async () =>
          await queryClient.ensureQueryData(getVariableListQueryOptions()),
      },
      {
        path: `${ROUTES.VARIABLES}/:variableId`,
        Component: VariableDetailPage,
        HydrateFallback: () => (
          <div style={{ color: 'var(--text-muted)', padding: '2rem' }}>
            Loading registry...
          </div>
        ),
        loader: async ({ params }) => {
          const { variableId } = params;
          if (!variableId) throw new Error('Missing variable ID');
          return await queryClient.ensureQueryData(
            getVariableDetailQueryOptions(variableId),
          );
        },
      },
      { path: ROUTES.ERROR, Component: NotFound },
    ],
  },
]);
