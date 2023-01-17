import React from 'react';
import {useState , useEffect} from 'react';
import Axios from 'axios'; 
import "./filter.css"
import NavBar from './navbar';
import './product_card.css';
import {useNavigate , useLocation} from 'react-router-dom';

function Filter() {

    const [ Loading , setLoading ] = useState(false);

    const Null = null;

    const [ Category , setCategory ] = useState( null );
    const [ Tag , setTag ] = useState( null );

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

    const Filter = () => {
        setLoading(true);
        Axios.put('http://localhost:3001/getProducts' , {Category : Category , Tag : Tag}).then((response) => {
            setProducts(response.data);
            setLoading(false);
        });
    }

    useEffect( () => {
        setLoading(true);
        Axios.put('http://localhost:3001/getProducts' , {Category : Category , Tag : Tag}).then((response) => {
            setProducts(response.data);
            setLoading(false);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    } , [] );

    return (
        <>
        <div className='filter'>
        {
                (Location.state === null)?<NavBar Received={null}/>:
                <NavBar Received={ {status: Location.state.status, name: Location.state.name , user:Location.state.user , type:Location.state.type , id:Location.state.id} } />
            }
            <div className="filter-bar">
                <label for="dropdown" className='heading'>Filters : &nbsp;</label>
                <select id="dropdown" className='filter-button' onChange={(e) => {setCategory(e.target.value)}}>
                    <option value= {Null} >All</option>
                    <option>Nylon</option>
                    <option>Woolen</option>
                    <option>Linen</option>
                </select>

                <select id="dropdown" className='filter-button' onChange={(e) => {setTag(e.target.value)}}>
                    <option value= {Null}>All</option>
                    <option>Curtain</option>
                    <option>Table Cover</option>
                </select>
                <button type='button' className='apply-button' onClick={Filter}>Apply</button>
            </div>
        </div>
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
                                    {   
                                        (Location.state === null)?
                                            <button className='button'
                                            onClick={()=>{Navigate("/ViewProduct" , 
                                            {state:{check: "out" ,Product_id : key._id}})}}
                                        >
                                            VIEW
                                            <i class="fi fi-rr-eye end-icons"></i>
                                        </button>
                                        :
                                        <button className='button'
                                            onClick={()=>{Navigate("/ViewProduct" , 
                                            {state:{ check: "in" , status: Location.state.status, name : Location.state.name , user:Location.state.user , Product_id : key._id , type:Location.state.type , id:Location.state.id}})}}
                                        >
                                            VIEW
                                            <i class="fi fi-rr-eye end-icons"></i>
                                        </button>
                                    }
                                </div>
                            </div>
                            {(Location.state!== null && Location.state.type === "admin")?
                            <>
                            <button className="delete_float" onClick={() => {delete_product(key._id)}}>DELETE</button>
                            <button onClick={() => {
                                Axios.post("http://localhost:3001/getProducts",{id : key._id}); 
                                Navigate('/editProducts' , 
                                {
                                    state:{id : key._id , name: key.name , 
                                    description : key.description , newprice : key.newprice , 
                                    oldprice : key.oldprice , category : key.category , 
                                    tags : key.tags , status : key.status}} )}
                                }
                            >
                                EDIT
                            </button>
                            </>:
                            <></>
                            }
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
                href="/products"
                class="add_float"
                rel="noopener noreferrer"
            >
                <i class="fi fi-br-plus add-icon"></i>
            </a>
        </>
    )
}

export default Filter;