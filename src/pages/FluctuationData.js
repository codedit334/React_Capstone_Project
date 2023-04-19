import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line import/extensions
import { fetchFluctuationData } from '../redux/fluctuationData/fluctuationDataSlice.js';

export default function FluctuationData() {
  const dispatch = useDispatch();

  const data = useSelector((state) => state.fluctuationData);
  const {
    status, error, fluctuationData, startDate, endDate,
  } = data;

  const [search, setSearch] = useState('');
  const filteredData = fluctuationData.filter(
    (item) => item.symbol.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchFluctuationData());
    }
  });
  return (
    <div className="fluctuation-data">
      <div className="header">
        <input
          value={search}
          data-testid="search-input"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="fluctuation-data-hero">
        <h2>Fluctuation Rates</h2>
        <h2>
          {`${startDate} => ${endDate}`}
          {' '}
        </h2>
      </div>
      <div className="fluctuation-data-title">
        <h3>Rates</h3>
      </div>
      {status === 'loading' && <div>loading...</div>}
      {status === 'succeeded' && (
        <div className="fluctuation-data-render">
          {filteredData
            && filteredData.slice(0, 6).map((data) => (
              <Link
                key={fluctuationData.indexOf(data)}
                to={`/currency/${data.symbol}`}
              >
                <span>{data.symbol}</span>
                <div>
                  <div>
                    Change:
                    {data.change}
                  </div>
                  <div>
                    {(data.change_pct * 100).toFixed(2)}
                    %
                  </div>
                </div>
              </Link>
            ))}
        </div>
      )}
      {status === 'failed' && <div>{error}</div>}
    </div>
  );
}
