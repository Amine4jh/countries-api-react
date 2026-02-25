import { useContext } from "react";
import { ThemeContext } from "../App";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const { darkMode } = useContext(ThemeContext);
  return (
    <div
      className={`min-h-screen font-sans ${darkMode ? "dark bg-[#202c37] text-white" : "bg-gray-50 text-gray-900"}`}
    >
      <Header />
      <main className="px-4 py-8 md:px-16 md:py-12 max-w-[1440px] mx-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
