import { Outlet } from '@tanstack/react-router';

function App({ useLoader }) {
  const { authContext } = useLoader();
  return (
    <div className="flex flex-col min-h-[100vh] space-between scrollbar-hide  bg-gradient-to-br from-white from-5% via-fuchsia-100  via-35% to-cyan-100">
      <Outlet />
    </div>
  );
}

export default App;
