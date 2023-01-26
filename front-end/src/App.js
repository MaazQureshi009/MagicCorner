/* eslint-disable react/jsx-pascal-case */
import {BrowserRouter as Router , Route , Routes} from 'react-router-dom';

import "/node_modules/bootstrap/dist/css/bootstrap.min.css";
import "/node_modules/bootstrap/dist/js/bootstrap.bundle";
import './home.css'
import './App.css';

import homeimage from './home.jpg'
import Display from './display';
import Products from './products';
import Users from './users';
import ForgotPassword from './RetrivePassword';
import SendPassword from './SendPassword';
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
import AdminDashBoard from './admin_dashboard';
import Confirmation from './CheckoutConfirmation'

function App() {
  return (
    <>
      <div className='home' id='home'>
        <div className="home-section">
              <img src={homeimage} alt="home" />
              <div className="content">
                <h2>Magic Corner</h2>
                <p>A complete spot to all your handmade products.</p>
                <a href="/#App"><button>Shop Now</button></a>
              </div>
        </div>
      </div>
      <div id="ok"></div>
      <div className="App" id="App">
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
            <Route path="/Confirmation" element={<Confirmation/>} />
            <Route path="/ForgotPassword" element={<ForgotPassword/>} />
            <Route path="/SendPassword" element={<SendPassword/>} />
            <Route path="/Dashboard" element={<AdminDashBoard/>} />
          </Routes>
        </Router>
      </div>
      <div className="footer my-5">
        <footer className="bg-light text-center text-white">
          <div className="container ">
            <section className="mb-4">
              <a className="btn btn-primary btn-floating m-1"
                style={{background: "#3b5998"}}
                href="#!"
                role="button"
                ><i className="fab fa-facebook-f"></i></a>

              <a className="btn btn-primary btn-floating m-1"
                style={{background: "#55acee"}}
                href="#!"
                role="button"
                ><i className="fab fa-twitter"></i></a>

              <a className="btn btn-primary btn-floating m-1"
                style={{background: "#dd4b39"}}
                href="#!"
                role="button"
                ><i className="fab fa-google"></i></a>

              <a className="btn btn-primary btn-floating m-1"
                style={{background: "#ac2bac"}}
                href="#!"
                role="button"
                ><i className="fab fa-instagram"></i></a>

              <a className="btn btn-primary btn-floating m-1"
                style={{background: "#0082ca"}}
                href="#!"
                role="button"
                ><i className="fab fa-linkedin-in"></i></a>
            </section>
          </div>
          <div className="text-center p-3" style={{background: "rgba(0, 0, 0, 0.2)"}}>
            {/* © 2022 Copyright: */}
            <a href="#!" className="text-black">MagicCorner.com</a>
          </div>
        </footer>  
      </div>
    </>
  );
}

export default App;
