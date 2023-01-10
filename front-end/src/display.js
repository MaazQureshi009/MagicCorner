import { useEffect , useState } from 'react';
import {useLocation} from 'react-router-dom';
import Axios from 'axios';
import NavBar from './navbar';
import './product_card.css';

function Display(){
    const Location = useLocation();

    const [Loading , setLoading] = useState(false);
    const [ Products , setProducts ] = useState([]);
    console.log(Location.state);
    useEffect( () => {
        setLoading(true);
        Axios.get('http://localhost:3001/getAllFeaturedProducts').then((response) => {
            setProducts(response.data);
            setLoading(false);
        });
    } , [] );

    return(
        <div>
            {
                (Location.state === null)?<NavBar Received={null}/>:
                <NavBar Received={ {status: Location.state.status , user:Location.state.user , type:Location.state.type} } />
            }
            <div className='banner'></div>
            <p id='header'>Top Products</p>
            <div className='rowww'>
                {
                    (Loading)?
                    <div class="loader"></div>
                    :
                    Products.map((key) => {
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
                                </div>
                            </div>
                            <div className='clear'></div>
                        </div>
                        );
                    }
                    )
                }
            </div>
            <a
                href="https://wa.me/2348100000000"
                class="whatsapp_float"
                target="_blank"
                rel="noopener noreferrer"
            >
                <i class="fa fa-whatsapp whatsapp-icon"></i>
            </a>
        </div>
    );
};

export default Display;