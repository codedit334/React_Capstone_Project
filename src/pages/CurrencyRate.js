import axios from "axios"; // eslint-disable-line
import { useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";
export default function CurrencyRate() {
  const { symbol } = useParams();
  const currencies = useLoaderData();
  console.log(currencies)
  const [search, setSearch] = useState("");

  const filteredData = currencies.slice(0, 6).filter((item) => {
    return item.symbol.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div>
      <input value={search} data-testid="search-input-2" onChange={(e) => setSearch(e.target.value)} />

      <h2>
        <span data-testid="symbol">{symbol}</span>
        <br />
        {currencies.slice(-1)[0].data_date}
      </h2>
      {filteredData &&
        filteredData.slice(0, 6).map((currencie) => (
          <div key={currencies.indexOf(currencie) * 12}>
            <span>{`${currencie.symbol}`}</span>
            <br />
            {currencie.rate}
          </div>
        ))}
    </div>
  );
}

export const currenciesLoader = async ({ params }) => {
  const { symbol } = params;
  const data_date = "2020-04-04";
  const url = `https://api.exchangerate.host/${data_date}?base=${symbol}&places=2`;

  const response = axios.get(url);
  const currencies = await response;
  let newArr = [];
  Object.keys(currencies.data.rates).forEach(function (key) {
    newArr.push({
      id: nanoid(),
      symbol: key,
      rate: currencies.data.rates[key],
    });
  });
  newArr = newArr.slice(0, 6);
  newArr.push({
    data_date,
  });
  return newArr;
};
