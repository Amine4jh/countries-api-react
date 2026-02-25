import { createContext, useEffect, useState } from "react";
import Layout from "./layouts/Layout";

export const ThemeContext = createContext({});

function App() {
  const [darkMode, setDarkMode] = useState(true);

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
    <ThemeContext value={{ darkMode, setDarkMode }}>
      <Layout />
    </ThemeContext>
  );
}

export default App;
