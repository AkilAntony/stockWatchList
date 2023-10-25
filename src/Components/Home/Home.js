import React,{useEffect, useState} from 'react'
import axios from 'axios';
import './Home.css';
import {useDispatch } from 'react-redux';

function Home() {
  const [data ,setData] = useState([]);
  const [input,setInput] = useState('');
  const [stockPrice, setStockPrice] = useState([]);
  const [symbols,setSymbols] =useState([]);
  const [warning,setWarning] = useState('');
  const suggestionAPI = `https://www.alphavantage.co/query?
                         function=SYMBOL_SEARCH&keywords=${input}&apikey=NU5C6T9DL9AM0ZAP`;
  const dispatch = useDispatch();
  
  const dummyData = [
  {
    name: "Apple",
    price: 150.50,
  },
  {
    name: "Microsoft",
    price: 300.25,
  },
  {
    name: "Google",
    price: 250.75,
  },
  {
    name: "Amazon",
    price: 3200.00,
  },
  {
    name: "Facebook",
    price: 340.80,
  }
];

//  fetch stock prize using symbol
  function getPrice() {
    const priceArray = [];
    const pricePromises = symbols.map(Symbol => {
      const PriceAPI = `https://www.alphavantage.co/query?
                      function=GLOBAL_QUOTE&symbol=${Symbol}&apikey=NU5C6T9DL9AM0ZAP`;
    return axios.get(PriceAPI)
            .then(response => {
              const price = response.data['Global Quote']['05. price'];
              console.log(price)
              if (price) {
                priceArray.push(price);
              } 
              else {
                  console.log('Price data not found in the response for', Symbol);
              }
            })
            .catch(error => {
              console.log('Error fetching price:', error);
            });
      });
    Promise.all(pricePromises)
    .then(() => {
      setStockPrice(priceArray);
    });
}


    // function for fetching sugesstions while user searching
  async function fetchSearchSuggestion(){
    try{
      const response = await axios.get(suggestionAPI);
      if(response.status === 200 && response.data.bestMatches){
        console.log(response.data.bestMatches)
        setData(response.data.bestMatches);
        setSymbols(response.data.bestMatches.map(Symbol =>Symbol['1. symbol']))
        
      }if(response.data.Note){
        setWarning(response.data.Note);
        console.log(response.data.Note)
      }else{
        setWarning(response.data.Information);
        console.log(response.data.Information)
        
      }
    }catch(error){
      console.log(error);
      setWarning("An error occurred while fetching data");
    }
  }

  // calling search suggestions
  useEffect( () => {
    if(input){
      fetchSearchSuggestion();
    }else{
      setData([])
    }
  }, [input]);

  // calling getPrice function
  useEffect(() => {
    if (symbols.length > 0) {
      getPrice();
    }
  }, [symbols]);

  // sending data to local storage using redux 
  const handleClick = (stockName,stockPrice)=>{
    const existingData = JSON.parse(localStorage.getItem('stocks'));
    const newData =[{
      id: Math.floor(Math.random()*100),
      name: stockName,
      price: stockPrice
    }]
    const updatedData = [...existingData, newData];
    console.log(stockName,stockPrice)
    dispatch({type: "ADD_TO-CART",payload:{updatedData}})
    localStorage.setItem('stocks', JSON.stringify(updatedData));
  }
 
  return (
    <main>
      <div className="searchBarContainer input-group rounded">
        <input type="search" 
               className="form-control" 
               placeholder="Search..."
               onChange={(e)=>setInput(e.target.value)} 
        />
      </div>
    {data.length > 0 ? 
      <table className='table-responsive'>
        <thead>
          <tr>
            <th scope="col">Company Name</th>
            <th scope="col">Share Price</th>
            <th scope="col">Add to watchList</th>
          </tr>
        </thead>
        <tbody>
          {data.map((sugesstion,index) =>(
            <tr key={index}>
              <td>{sugesstion['2. name']}</td>
              <td>{stockPrice[index]}</td>
              <td> 
                <i className='fas fa-plus'
                   onClick={()=>handleClick(sugesstion['2. name'],stockPrice[index])}></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table> : '' }
      {input ?
      <div className='alert alert-danger col-md-4'>
        <h4>Sorry !</h4>
        <p>{warning}</p>
    </div> : null}
  
    </main>
   
  )
}

export default Home
