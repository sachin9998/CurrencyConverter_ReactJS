// import React from 'react'

import { useEffect, useState } from "react";
import CurrencyDropdown from "./DropDown";
import { HiArrowsRightLeft } from "react-icons/hi2";

const CurrencyConverter = () => {

    const [currencies, setCurrencies] = useState([]);
    const [amount, setAmount] = useState(1);

    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("INR");

    const [convertedAmount, setConvertedAmount] = useState(null);
    const [converting, setConverting] = useState(false);

    const [favourites, setFavourites] = useState(JSON.parse(localStorage.getItem("favourites")) || ['INR', "EUR"]);

    // Currency Fetching ---> "api.frankfurter.app/currencies"
    const fetchCurrencies = async () => {
        try {
            const resp = await fetch("https://api.frankfurter.app/currencies");
            const data = await resp.json();

            setCurrencies(Object.keys(data));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchCurrencies();
    }, []);

    //   ----> console.log(currencies);

    // "https://api.frankfurter.app/latest?amount=1&from=USD$toINR"
    const convertCurrency = async () => {

        if (!amount) return;
        setConverting(true);

        try {
            const resp = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`);

            const data = await resp.json();

            setConvertedAmount(data.rates[toCurrency] + " " + toCurrency);
        }

        catch (error) {
            console.log(error);
        }

        finally {
            setConverting(false);
        }
    };

    const handleFavourite = (currency) => {
        let updatedFavourites = [...favourites];

        if (favourites.includes(currency)) {
            updatedFavourites = updatedFavourites.filter(fav => fav !== currency);
        }
        else {
            updatedFavourites.push(currency);
        }

        setFavourites(updatedFavourites);
        localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
    }

    const swapCurrencies = () => {
        setToCurrency(fromCurrency);
        setFromCurrency(toCurrency);
    }

    return (
        <div className="max-w-xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md">
            <h2 className="mb-5 text-2xl font-semibold text-gray-700">
                Currency Converter
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                <CurrencyDropdown
                    currencies={currencies} title="From:"
                    handleFavourite={handleFavourite}
                    currency={fromCurrency}
                    setCurrency={setFromCurrency}
                    favourites={favourites}
                />

                {/* Swap currency button */}
                <div className="flex justify-center -mb-5 sm:mb-0">

                    <button onClick={swapCurrencies} className="p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300">
                        <HiArrowsRightLeft />
                    </button>

                </div>

                <CurrencyDropdown
                    currencies={currencies}
                    title="To:"
                    handleFavourite={handleFavourite}
                    currency={toCurrency}
                    setCurrency={setToCurrency}
                    favourites={favourites}
                />
            </div>

            <div className="mt-4">
                <label
                    htmlFor="amount"
                    className="block text-sm font-medium text-gray-700"
                >
                    Amount:{" "}
                </label>

                <input
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1"
                ></input>
            </div>

            <div className="flex justify-end mt-6">
                <button
                    onClick={convertCurrency}
                    className={`px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offeset-2 ${converting ? "animate-pulse" : "none"}`}
                >
                    Convert
                </button>
            </div>

            {convertedAmount && <div className="mt-4 text-xl font-medium text-right text-green-600 ">
                Converted Amount: {convertedAmount}
            </div>}
        </div>
    );
};

export default CurrencyConverter;
