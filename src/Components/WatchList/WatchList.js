import './watchList.css'
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

function WatchList() {
  const stocks = useSelector((state) => state);
  console.log('stocks',stocks)
  const [shares, setShares] = useState(); // Initialize with data from local storage
  console.log('shares=',shares)
 
  useEffect(() => {
    const storedShares = JSON.parse(localStorage.getItem('stocks'));
    console.log('Retrieved stocks from local storage', storedShares);
    setShares(storedShares);
  }, [shares]);  

  const handleRemoveItem = (stockId) =>{
    localStorage.removeItem(stockId)
  }

  return (
    <div>
      <table className = 'table-responsive'>
         
        <tbody>
          {Array.isArray(shares) ? (
            shares.map((innerArray, index) => (
              <tr key={index}>
                {Array.isArray(innerArray) ? (
                  innerArray.map((stock, innerIndex) => (
                    <React.Fragment key={innerIndex}>
                      <td>{stock.name}</td>
                      <td>{stock.price}</td>
                      <td>
                        <button onClick={()=>handleRemoveItem(stock.id)}>-</button>
                      </td>
                    </React.Fragment>
                  ))
                ) : ''}
              </tr>
            ))
          ) :  <p>No data</p>
             }
        </tbody>
      </table>
    
    </div>
  );
}

export default WatchList;
