import React from 'react';
import {useState , useEffect} from 'react';
import Axios from 'axios'; 
import "./filter.css"
import NavBar from './navbar';
import './product_card.css';
import {useNavigate , useLocation , Link} from 'react-router-dom';

function Workshop() {
    const [ Loading , setLoading ] = useState(false);
    const Navigate = useNavigate();
    const Location = useLocation();

    const delete_product = (id) => {
        setLoading(true);
        Axios.put('http://localhost:3001/DeleteWorkshop' , {id : id}).then(() =>{
            alert("Product Deleted");
            Axios.get('http://localhost:3001/getAllWorkshops').then((response) => {
            setProducts(response.data);
            setLoading(false);
        });
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
                <NavBar Received={ {status: Location.state.status, name: Location.state.name , user:Location.state.user , type:Location.state.type , id:Location.state.id} } />
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
                                {(Location.state === null)?
                                        <button className='button'
                                        onClick={()=>{Navigate("/ViewWorkShop" , 
                                        {state:{check: "out" ,Product_id : key._id}})}}
                                    >
                                        VIEW
                                        <i class="fi fi-rr-eye end-icons"></i>
                                    </button>
                                    :
                                    <button className='button'
                                        onClick={()=>{Navigate("/ViewWorkShop" , 
                                        {state:{ check: "in" , status: Location.state.status, name : Location.state.name , user:Location.state.user , Product_id : key._id , type:Location.state.type , id:Location.state.id}})}}
                                    >
                                        VIEW
                                        <i class="fi fi-rr-eye end-icons"></i>
                                    </button>
                                    }
                                    {(Location.state!== null && Location.state.type === "admin")?
                                        <>
                                        <button className='delete-btn mx-2' onClick={() => {delete_product(key._id)}}><i class="fi fi-sr-trash"></i></button>
                                        <button className='edit-btn mx-2' onClick={() => { 
                                            Navigate('/editWorkshops' , 
                                            {
                                                state:{id : key._id , name: key.name , 
                                                description : key.description , newprice : key.newprice , 
                                                oldprice : key.oldprice ,
                                                user_status: Location.state.status, user_name : Location.state.name , user:Location.state.user , Product_id : key._id , type:Location.state.type , user_id:Location.state.id}} 
                                                )}
                                            }
                                        >
                                        <i class="fi fi-sr-pencil"></i>
                                        </button>
                                        </>:
                                        <></>
                                    }
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
            <Link
                to="/addWorkshops"
                class="add_float"
                rel="noopener noreferrer"
                state={ {user_status: Location.state.status, user_name : Location.state.name , user:Location.state.user , type:Location.state.type , user_id:Location.state.id}}
            >
                <i class="fi fi-br-plus add-icon"></i>
            </Link>
        </>
    )
}

export default Workshop;