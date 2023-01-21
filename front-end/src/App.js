/* eslint-disable react/jsx-pascal-case */
import {BrowserRouter as Router , Route , Routes} from 'react-router-dom';

import "/node_modules/bootstrap/dist/css/bootstrap.min.css";
import "/node_modules/bootstrap/dist/js/bootstrap.bundle";

import './App.css';
import Display from './display';
import Products from './products';
import Users from './users';
import Login from './Login';
import Workshops from './addWorkshops';
import EditProduct from './editProduct'
import EditWorkshop from './editWorkshops';
import Upload_User from './Upload_User';
import Upload_Admin from './Upload_Admin';
import Filter from './filter';
import Search from './searchbar';
import Workshop from './workshops';
import ViewProduct from './ViewProduct';
import ViewWorkShop from './ViewWorkshops';
import Cart from './cart';
import WishList from './WishList';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Display />} />
          <Route path='/products' element={<Products />} />
          <Route path='/users' element={<Users />} />
          <Route path='/addWorkshops' element={<Workshops />} />
          <Route path='/editProducts' element={<EditProduct />} />
          <Route path='/editWorkshops' element={<EditWorkshop />} />
          <Route path='/adminVerification' element={<Upload_Admin/>}/>
          <Route path='/userVerification' element={<Upload_User/>}/>
          <Route path='/displayProducts' element={<Filter/>}/>
          <Route path='/search' element={<Search/>}/>
          <Route path='/displayWorkshops' element={<Workshop/>}/>
          <Route path="/ViewProduct" element={<ViewProduct/>}/>
          <Route path="/ViewWorkShop" element={<ViewWorkShop/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path="/Login" element={<Login/>} />
          <Route path="/WishList" element={<WishList/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
