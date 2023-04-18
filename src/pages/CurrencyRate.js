import axios from "axios"; // eslint-disable-line
import { useEffect } from "react";
import { useLoaderData, useParams } from "react-router-dom";
export default function CurrencyRate() {
  const { symbol } = useParams();
  const currencies = useLoaderData();
  
  return (
    <div>
      <h2>
        {symbol}
        <br />
        {currencies.slice(-1)[0].data_date}
      </h2>
      {currencies &&
        currencies.slice(0, 6).map((currencie) => (
          <div key={currencies.indexOf(currencie) * 12}>
            {`${currencie.symbol}`}
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
  const url = `https://api.exchangerate.host/${data_date}?base=${symbol}&places=4`;

  const response = axios.get(url);
  const currencies = await response;
  let newArr = [];
  Object.keys(currencies.data.rates).forEach(function (key) {
    newArr.push({
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
