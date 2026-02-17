import { useState } from "react";
import { useCountries } from "../hooks/useCountries";
import { ChevronDown, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AllCountries = ({ darkMode }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigate = useNavigate();

  const regions = ["Africa", "America", "Asia", "Europe", "Oceania"];

  const { data: countries, isLoading, isError, error } = useCountries();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error because: {error}</p>;
  }

  return (
    <div className="animate-in fade-in duration-300">
      {/* TOOLBAR */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 mb-12">
        {/* Search Bar */}
        <div
          className={`flex items-center w-full md:w-[480px] rounded-md shadow-md px-8 py-4 ${darkMode ? "bg-white" : "bg-[#2b3945]"}`}
        >
          <Search
            size={20}
            className={darkMode ? "text-white" : "text-gray-400"}
          />
          <input
            type="text"
            placeholder="Search for a country..."
            className={`w-full ml-6 bg-transparent outline-none text-sm placeholder:text-current opacity-80`}
          />
        </div>

        {/* Custom Dropdown (Static design) */}
        <div className="relative w-52 z-10">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={`w-full flex justify-between items-center rounded-md shadow-md px-6 py-4 text-sm font-medium ${darkMode ? "bg-white" : "bg-[#2b3945]"}`}
          >
            Filter by Region
            <ChevronDown size={16} />
          </button>

          {isDropdownOpen && (
            <div
              className={`absolute top-full left-0 right-0 mt-2 rounded-md shadow-md py-4 ${darkMode ? "bg-white" : "bg-[#2b3945]"}`}
            >
              {regions.map((region) => (
                <div
                  key={region}
                  className="px-6 py-1.5 text-sm hover:opacity-70 cursor-pointer"
                >
                  {region}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {countries.map((country) => (
          <div
            key={country.cca3}
            onClick={() => navigate(`/country/${country.ccn3}`)}
            className={`rounded-md shadow-lg overflow-hidden cursor-pointer hover:-translate-y-1 transition-transform duration-200 ${darkMode ? "bg-white" : "bg-[#2b3945]"}`}
          >
            <img
              src={country.flags.png}
              alt={`${country.name.common} flag`}
              className="w-full h-40 object-cover"
            />
            <div className="p-6 pt-8 pb-10">
              <h2 className="font-extrabold text-lg mb-4">
                {country.name.common}
              </h2>
              <p className="text-sm mb-1">
                <span className="font-semibold">Population:</span>{" "}
                {country.population.toLocaleString()}
              </p>
              <p className="text-sm mb-1">
                <span className="font-semibold">Region:</span> {country.region}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Capital:</span>{" "}
                {country.capital}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* STATIC PAGINATION */}
      <div className="mt-16 flex justify-center items-center gap-2">
        <button
          className={`px-4 py-2 rounded-md text-sm shadow-sm ${darkMode ? "bg-white hover:bg-gray-100" : "bg-[#2b3945] hover:bg-gray-700"} transition-colors disabled:opacity-50`}
          disabled
        >
          Previous
        </button>
        <button
          className={`w-10 h-10 rounded-md text-sm shadow-sm flex items-center justify-center ${darkMode ? "bg-[#2b3945] hover:bg-gray-700" : "bg-white hover:bg-gray-100"} font-bold border-2 border-transparent`}
        >
          1
        </button>
        <button
          className={`w-10 h-10 rounded-md text-sm shadow-sm flex items-center justify-center ${darkMode ? "bg-[#2b3945] hover:bg-gray-700" : "bg-white hover:bg-gray-100"}`}
        >
          2
        </button>
        <button
          className={`w-10 h-10 rounded-md text-sm shadow-sm flex items-center justify-center ${darkMode ? "bg-[#2b3945] hover:bg-gray-700" : "bg-white hover:bg-gray-100"}`}
        >
          3
        </button>
        <span className="px-2">...</span>
        <button
          className={`w-10 h-10 rounded-md text-sm shadow-sm flex items-center justify-center ${darkMode ? "bg-[#2b3945] hover:bg-gray-700" : "bg-white hover:bg-gray-100"}`}
        >
          10
        </button>
        <button
          className={`px-4 py-2 rounded-md text-sm shadow-sm ${darkMode ? "bg-[#2b3945] hover:bg-gray-700" : "bg-white hover:bg-gray-100"} transition-colors`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllCountries;
