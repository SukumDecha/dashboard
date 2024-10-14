import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";

const MainLayout = () => {
  return (
    <div className="flex h-screen max-h-screen overflow-hidden bg-primary-300">
      <Sidebar />
      <div className="flex flex-col flex-grow">
        <div className="flex-shrink">
          <Topbar />
        </div>
        <div className="overflow-y-auto">
          {/* Outlet will render the content of nested routes */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
