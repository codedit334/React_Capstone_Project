import axios from "axios"; // eslint-disable-line
import { useState } from 'react';
import { useLoaderData, useParams, Link } from 'react-router-dom';
import { nanoid } from '@reduxjs/toolkit';

export default function CurrencyRate() {
  const { symbol } = useParams();
  const currencies = useLoaderData();
  const [search, setSearch] = useState('');

  const filteredData = currencies.slice(0, 6)
    .filter(
      (item) => item.symbol.toLowerCase().includes(search.toLowerCase()),
    );

  return (
    <div>
      <div className="header">
        <span><Link to="/">⇦</Link></span>
        <input
          value={search}
          data-testid="search-input-2"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="currency-rate-hero">
        <h2 data-testid="symbol">{symbol}</h2>
        <h2>
          {currencies.slice(-1)[0].dataDate}
        </h2>
      </div>
      <div className="currency-rate-title">
        <h3>Historical Rates</h3>
      </div>
      <div className="currency-rate-render">

        {filteredData
        && filteredData.slice(0, 6).map((currencie) => (
          <div key={currencies.indexOf(currencie) * 12}>
            <span>{`${currencie.symbol}`}</span>
            <br />
            <div>{currencie.rate}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export const currenciesLoader = async ({ params }) => {
  const { symbol } = params;
  const dataDate = '2020-04-04';
  const url = `https://api.exchangerate.host/${dataDate}?base=${symbol}&places=2`;

  const response = axios.get(url);
  const currencies = await response;
  let newArr = [];
  Object.keys(currencies.data.rates).forEach((key) => {
    newArr.push({
      id: nanoid(),
      symbol: key,
      rate: currencies.data.rates[key],
    });
  });
  newArr = newArr.slice(0, 6);
  newArr.push({
    dataDate,
  });
  return newArr;
};
