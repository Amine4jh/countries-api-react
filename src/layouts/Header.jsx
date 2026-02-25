import { Moon, Sun } from "lucide-react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../App";

const Header = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  return (
    <header
      className={`px-4 py-6 md:px-16 md:py-6 shadow-md flex justify-between items-center relative z-20 ${darkMode ? "bg-[#2b3945]" : "bg-white"}`}
    >
      <h1 className="font-extrabold text-sm md:text-xl lg:text-2xl cursor-pointer">
        <Link to={"/"}>Where in the world?</Link>
      </h1>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="flex items-center gap-2 font-semibold text-xs md:text-sm hover:opacity-80 transition-opacity cursor-pointer"
      >
        {darkMode ? (
          <>
            <Sun size={16} className="fill-current" />
            Light Mode
          </>
        ) : (
          <>
            <Moon size={16} />
            Dark Mode
          </>
        )}
      </button>
    </header>
  );
};

export default Header;
