import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="flex flex-col h-[100vh] space-between scrollbar-hide bg-gradient-to-br from-gray-50 from-15% to-blue-100 overflow-hidden">
      <Outlet />
    </div>
  );
}

export default App;
