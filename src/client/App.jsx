import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="flex flex-col h-[100vh] space-between scrollbar-hide background-image ">
      <Outlet />
    </div>
  );
}

export default App;
