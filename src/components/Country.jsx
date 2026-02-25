import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useCountryDetails } from "../hooks/useCountries";
import { useContext } from "react";
import { ThemeContext } from "../App";

const Country = () => {
  const { darkMode } = useContext(ThemeContext);
  const { id } = useParams();

  const {
    data: countryDetails,
    isLoading,
    isError,
    error,
  } = useCountryDetails(id);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error because: {error}</p>;
  }

  return (
    <div className="animate-in fade-in duration-300 md:mt-8">
      {/* BACK BUTTON */}
      <Link
        to={"/"}
        className={`flex items-center gap-3 px-8 py-2 rounded-md shadow-[0_0_8px_rgba(0,0,0,0.15)] mb-16 md:mb-20 hover:opacity-80 transition-opacity ${darkMode ? "bg-[#2b3945]" : "bg-white"}`}
      >
        <ArrowLeft size={18} />
        <span className="text-sm font-medium">Back</span>
      </Link>

      {/* DETAIL CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-28 items-center">
        {/* Flag Image */}
        <img
          src={countryDetails.flags.png}
          alt={`${countryDetails.name.common} flag`}
          className="w-full max-h-[400px] object-cover shadow-lg rounded-sm"
        />

        {/* Info Container */}
        <div className="py-8">
          <h2 className="font-extrabold text-3xl mb-8">
            {countryDetails.name.common}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-16">
            {/* Left Column Stats */}
            <div className="space-y-3">
              <p className="text-sm">
                <span className="font-semibold">Native Name:</span>{" "}
                {Object.values(countryDetails.name.nativeName)[0]?.official}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Population:</span>{" "}
                {countryDetails.population.toLocaleString()}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Region:</span>{" "}
                {countryDetails.region}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Sub Region:</span>{" "}
                {countryDetails.subregion}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Capital:</span>{" "}
                {countryDetails.capital}
              </p>
            </div>

            {/* Right Column Stats */}
            <div className="space-y-3">
              <p className="text-sm">
                <span className="font-semibold">Top Level Domain:</span>{" "}
                {countryDetails.tld[0]}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Currencies:</span>{" "}
                {Object.values(countryDetails.currencies)[0]
                  ?.name.charAt(0)
                  .toUpperCase() +
                  Object.values(countryDetails.currencies)[0]?.name.slice(1)}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Languages:</span>{" "}
                {Object.values(countryDetails.languages).join(", ")}
              </p>
            </div>
          </div>

          {/* Border Countries */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <span className="font-semibold text-sm whitespace-nowrap">
              Border Countries:
            </span>
            <div className="flex flex-wrap gap-3">
              {countryDetails.borders ? (
                countryDetails.borders.map((border, idx) => (
                  <span
                    key={idx}
                    className={`px-6 py-1 text-sm shadow-[0_0_4px_rgba(0,0,0,0.2)] rounded-sm cursor-pointer hover:opacity-70 ${darkMode ? "bg-[#2b3945]" : "bg-white"}`}
                  >
                    {border}
                  </span>
                ))
              ) : (
                <span className="text-sm">Unknown</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Country;
