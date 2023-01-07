import { useNavigate  , useLocation } from 'react-router-dom';
import { useEffect , useState } from 'react';
import Axios from 'axios';
import NavBar from './navbar';
import './product_card.css';

function Display(){

    const delete_product = (id) => {
        Axios.post('http://localhost:3001/DeleteProduct' , {id : id});
        alert("Product Deleted")
    };

    const [ Products , setProducts ] = useState([]);

    useEffect( () => {
        Axios.get('http://localhost:3001/getAllFeaturedProducts').then((response) => {
            setProducts(response.data);
        });
    } , [] );

    const Navigate = useNavigate();
    const Location = useLocation();

    return(
        <div>
            {
                (Location.state === null)?
                <>
                    <NavBar/>
                </>:
                <>
                    <NavBar/>
                </>
            }
            <div className='banner'></div>
            <p id='header'>Top Products</p>
            <div className='rowww'>
                {Products.map((key) => {
                    return(
                        <div className='col'>
                            <div className='image'>
                                <img src={key.image} alt="Product" className='img-img'></img>
                            </div>
                            <div>
                                <div className='contents'>
                                    <p className='product-name'>{key.name}</p>
                                    <p className='product-price'>Price : {key.newprice} /-</p>
                                </div>
                                <div className='buttons'>
                                    <button className='button'>VIEW<i class="fi fi-rr-eye end-icons"></i></button>
                                    <button onClick={() => {delete_product(key._id)}}>DELETE</button>
                                </div>
                            </div>
                            <div className='clear'></div>
                        </div>
                        );
                    }
                    )
                }
            </div>
        </div>
    );
};

export default Display;