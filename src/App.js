 
import './App.css';
import { Link, Outlet, Route, Routes } from 'react-router-dom';
import Home from './Components/Home/Home';
import WatchList from './Components/WatchList/WatchList';
import Header from './Components/Header/Header';

function App() {
  return (
    <div className="App">
      <Header />
      
      <div className="mainContainer">
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='watchList' element={<WatchList/>} />
        </Routes>
      </div>
     
    </div>
  );
}

export default App;
