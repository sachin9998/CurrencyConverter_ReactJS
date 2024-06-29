
import { HiOutlineStar } from "react-icons/hi2";
import { HiStar } from "react-icons/hi2";

const CurrencyDropdown = ({
    currencies,
    currency,
    setCurrency,
    favourites,
    handleFavourite,
    title = "",
}) => {

    const isFavourite = curr => favourites.includes(curr)

    return (


        <div>
            <label
                className="block text-sm font-medium text-gray-700"
                htmlFor={title}
            >
                {title}
            </label>

            <div className="mt-1 relative">
                <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="w-full p-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    {/* --> Render Favourites <-- */}

                    {favourites.map((currency) => {
                        return <option className="bg-gray-200" value={currency} key={currency}>
                            {currency}
                        </option>
                    })}

                    <hr />

                    {currencies?.filter(c => !favourites.includes(c))
                        .map((currency) => {
                            return (
                                <option value={currency} key={currency}>
                                    {currency}
                                </option>
                            );
                        })}
                </select>

                <button onClick={() => handleFavourite(currency)} className="absolute inset-y-0 right-0 pr-5 flex items-center text-sm leading-5">

                    {isFavourite(currency) ? <HiStar /> : <HiOutlineStar />}

                </button>

            </div>
        </div>
    );
};

export default CurrencyDropdown;
