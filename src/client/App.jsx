import { Outlet } from '@tanstack/react-router';
import Navbar from './components/Navbar';

function App({ useLoader }) {
  const { authContext } = useLoader();
  return (
    <>
      <Navbar authContext={authContext} />
      <Outlet />
    </>
  );
}

export default App;
