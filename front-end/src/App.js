/* eslint-disable react/jsx-pascal-case */
import {BrowserRouter as Router , Route , Routes} from 'react-router-dom';

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
          <Route path="/Login" element={<Login/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
