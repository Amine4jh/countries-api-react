import { useContext, useState } from "react";
import { useCountries } from "../hooks/useCountries";
import { ChevronDown, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../App";

const AllCountries = () => {
  const { darkMode } = useContext(ThemeContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigate = useNavigate();

  const { data: countries, isLoading, isError, error } = useCountries();

  const [page, setPage] = useState({
    current: 1,
    limit: 12,
  });

  const [filterTerm, setFilterTerm] = useState("All");

  const [searchTerm, setSearchTerm] = useState("");

  // filter by region
  let filteredCountries = countries?.filter((item) =>
    filterTerm === "All" ? item : item.region === filterTerm,
  );

  // Search country by name
  filteredCountries = filteredCountries?.filter((item) =>
    searchTerm === ""
      ? item
      : item.name.common.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Remove no-countries
  filteredCountries = filteredCountries?.filter((item) => item.ccn3 !== "376");

  // Sort by alpha
  filteredCountries = filteredCountries?.sort((a, b) =>
    a.name.common.localeCompare(b.name.common),
  );

  // Calculate pagination details
  const totalItems = filteredCountries?.length || 0;
  const totalPages = Math.ceil(totalItems / page.limit) || 1;

  // Slice countries array
  const startIndex = (page.current - 1) * page.limit;
  const currentCountries =
    filteredCountries?.slice(startIndex, startIndex + page.limit) || [];

  const nextPage = () => {
    setPage((prev) => ({
      ...prev,
      current: Math.min(totalPages, prev.current + 1),
    }));
  };

  const prevPage = () => {
    setPage((prev) => ({ ...prev, current: Math.max(1, prev.current - 1) }));
  };

  const goToPage = (pageNumber) => {
    setPage((prev) => ({ ...prev, current: pageNumber }));
  };

  // generate page numbers
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (page.current <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (page.current >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        );
      } else {
        pages.push(
          1,
          "...",
          page.current - 1,
          page.current,
          page.current + 1,
          "...",
          totalPages,
        );
      }
    }
    return pages;
  };

  let regions = Array.from(new Set(countries?.map((item) => item.region)));

  const handleFilter = (e) => {
    setIsDropdownOpen(false);
    setFilterTerm(e.target.textContent);
  };

  const handleRemoveFilter = () => {
    setIsDropdownOpen(false);
    setFilterTerm("All");
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error because: {error}</p>;

  return (
    <div className="animate-in fade-in duration-300">
      {/* TOOLBAR (Unchanged) */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 mb-12">
        <div
          className={`flex items-center w-full md:w-[480px] rounded-md shadow-md px-8 py-4 ${darkMode ? "bg-[#2b3945]" : "bg-white"}`}
        >
          <Search
            size={20}
            className={darkMode ? "text-gray-400" : "text-white"}
          />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            placeholder="Search for a country..."
            className="w-full ml-6 bg-transparent outline-none text-sm placeholder:text-current opacity-80"
          />
        </div>

        {/* Custom Dropdown (Static design) */}
        <div className="relative w-52 z-10">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={`w-full flex justify-between items-center rounded-md shadow-md px-6 py-4 text-sm font-medium ${darkMode ? "bg-[#2b3945]" : "bg-white"}`}
          >
            Filter by Region
            <ChevronDown size={16} />
          </button>

          {isDropdownOpen && (
            <div
              className={`absolute top-full left-0 right-0 mt-2 rounded-md shadow-md py-4 ${darkMode ? "bg-[#2b3945]" : "bg-white"}`}
            >
              <div
                className="px-6 py-1.5 text-sm hover:opacity-70 cursor-pointer"
                onClick={handleRemoveFilter}
              >
                All
              </div>
              {regions.map((region) => (
                <div
                  key={region}
                  className="px-6 py-1.5 text-sm hover:opacity-70 cursor-pointer"
                  onClick={handleFilter}
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
        {currentCountries.map((country) => (
          <div
            key={country.cca3}
            onClick={() => navigate(`/country/${country.ccn3}`)}
            className={`rounded-md shadow-lg overflow-hidden cursor-pointer hover:-translate-y-1 transition-transform duration-200 ${darkMode ? "bg-[#2b3945]" : "bg-white"}`}
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

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="mt-16 flex justify-center items-center gap-2">
          <button
            onClick={prevPage}
            disabled={page.current === 1}
            className={`px-4 py-2 rounded-md text-sm shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${darkMode ? "bg-[#2b3945] hover:bg-gray-700" : "bg-white hover:bg-gray-100"}`}
          >
            Previous
          </button>

          {getPageNumbers().map((pageNum, idx) =>
            pageNum === "..." ? (
              <span key={`ellipsis-${idx}`} className="px-2">
                ...
              </span>
            ) : (
              <button
                key={pageNum}
                onClick={() => goToPage(pageNum)}
                className={`w-10 h-10 rounded-md text-sm shadow-sm flex items-center justify-center font-bold transition-colors ${
                  page.current === pageNum
                    ? "border-2 border-blue-500 opacity-100"
                    : "border-2 border-transparent opacity-80 hover:opacity-100"
                } ${darkMode ? "bg-[#2b3945] text-white" : "bg-white text-black"}`}
              >
                {pageNum}
              </button>
            ),
          )}

          <button
            onClick={nextPage}
            disabled={page.current === totalPages}
            className={`px-4 py-2 rounded-md text-sm shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${darkMode ? "bg-[#2b3945] hover:bg-gray-700" : "bg-white hover:bg-gray-100"}`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AllCountries;
