import { Outlet } from "react-router-dom";
import Sidebar from "src/components/Layout/Sidebar";

const Layout = () => {
  return (
    <main className="h-full flex">
      <Sidebar />
      <Outlet />
    </main>
  );
};

export default Layout;
