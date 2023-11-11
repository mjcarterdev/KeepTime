import { Outlet } from '@tanstack/react-router';

function App({ useLoader }) {
  const { authContext } = useLoader();
  return (
    <div className="flex flex-col h-[100vh] space-between scrollbar-hide bg-gradient-to-br from-gray-50 from-15% to-blue-100 overflow-hidden">
      <Outlet />
    </div>
  );
}

export default App;
