import { Suspense } from 'react';
import MainLayout from './components/layout/MainLayout';
import { Outlet } from 'react-router-dom';
import Loading from './components/Loading';

function App() {
  return (
    <MainLayout>
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
    </MainLayout>
  );
}

export default App;
