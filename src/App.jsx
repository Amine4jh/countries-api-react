import { useEffect, useState } from "react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";

function App() {
  const [darkMode, setDarkMode] = useState(true);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("bg-[#202c37]");
      document.body.classList.remove("bg-gray-50");
    } else {
      document.body.classList.add("bg-gray-50");
      document.body.classList.remove("bg-[#202c37]");
    }
  }, [darkMode]);
  return (
    <>
      <div
        className={`min-h-screen font-sans ${darkMode ? "dark bg-[#202c37] text-white" : "bg-gray-50 text-gray-900"}`}
      >
        <Header darkMode={darkMode} toggleTheme={toggleTheme} />
        <main className="px-4 py-8 md:px-16 md:py-12 max-w-[1440px] mx-auto">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default App;
