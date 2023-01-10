import React from 'react';
import {useState , useEffect} from 'react';
import Axios from 'axios'; 
import "./filter.css"
import NavBar from './navbar';
import './product_card.css';
import {useNavigate , useLocation} from 'react-router-dom';

function Workshop() {

    const [ Loading , setLoading ] = useState(false);
    const Navigate = useNavigate();
    const Location = useLocation();

    const delete_product = (id) => {
        setLoading(true);
        Axios.put('http://localhost:3001/DeleteProduct' , {id : id}).then(() =>{
            setLoading(false);
            alert("Product Deleted");
        });
    };

    const [ Products , setProducts ] = useState([]);

    useEffect( () => {
        setLoading(true);
        Axios.get('http://localhost:3001/getAllWorkshops').then((response) => {
            setProducts(response.data);
            setLoading(false);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    } , [] );

    return (
        <>
        {
            (Location.state === null)?<NavBar Received={null}/>:
                <NavBar Received={ {status: Location.state.status , user:Location.state.user , type:Location.state.type} } />
        }
        <div className='rowww'>
                {
                    (Loading)?<div class="loader"></div>:

                    (Products === [])?
                    <p>NOTHING FOUND</p>
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
                            <button className="delete_float" onClick={() => {delete_product(key._id)}}>DELETE</button>
                            <button onClick={() => { 
                                Navigate('/editWorkshops' , 
                                {
                                    state:{id : key._id , name: key.name , 
                                    description : key.description , newprice : key.newprice , 
                                    oldprice : key.oldprice }} 
                                    )}
                                }
                            >
                                EDIT
                            </button>
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
            <a
                href="/addWorkshops"
                class="add_float"
                rel="noopener noreferrer"
            >
                <i class="fi fi-br-plus add-icon"></i>
            </a>
        </>
    )
}

export default Workshop;