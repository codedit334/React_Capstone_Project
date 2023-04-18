import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { StyleSheet, css } from "aphrodite";
import { useDispatch, useSelector } from "react-redux";
import { fetchFluctuationData } from "../redux/fluctuationData/fluctuationDataSlice.js";

export default function FluctuationData() {
  const dispatch = useDispatch();

  const data = useSelector((state) => state.fluctuationData);
  const { status, error, fluctuationData, start_date, end_date } = data;

  // console.log(fluctuationData);
  const [search, setSearch] = useState("");
  const filteredData = fluctuationData.filter((item) =>
    item.symbol.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchFluctuationData());
    }
  });
  return (
    <div>
      <input value={search} data-testid="search-input" onChange={(e) => setSearch(e.target.value)} />
      <h1>{`${start_date} => ${end_date}`} </h1>
      {status === "loading" && <div>loading...</div>}
      {status === "succeeded" && (
        <div>
          {filteredData &&
            filteredData.slice(0, 6).map((data) => (
              <Link
                key={fluctuationData.indexOf(data)}
                to={`/currency/${data.symbol}`}
              >
                <span>{data.symbol}</span>
                <br />
                {data.change}
                <br />
                {(data.change_pct * 100).toFixed(2)}%
              </Link>
            ))}
        </div>
      )}
      {status === "failed" && <div>{error}</div>}
    </div>
  );
}

// const styles = StyleSheet.create({
//   VATRatesWrapper: {
//     width: "100%",
//   },
//   VATRates: {
//     display: "grid",
//     gridTemplateColumns: "repeat(2, 1fr)",
//   },
// });
