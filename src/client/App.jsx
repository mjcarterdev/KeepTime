import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="flex flex-col h-[100vh] space-between scrollbar-hide background-image overflow-hidden">
      <Outlet />
    </div>
  );
}

export default App;
