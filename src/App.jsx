import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="w-full h-screen bg-[#151515] text-white">
      <Outlet />
    </div>
  );
}

export default App;
