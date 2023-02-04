import React from 'react';
import {useState , useEffect} from 'react';
import Axios from 'axios'; 
import "./filter.css"
import NavBar from './navbar';
import WorkshopView from './ViewWorkshops';
import './product_card.css';
import SideBar from './SideBar';
import {useNavigate , useLocation } from 'react-router-dom';

function Workshop() {
    const [ Loading , setLoading ] = useState(false);
    const [ ActiveProduct , setActiveProduct ] = useState(null);
    const [ Expand , setExpand ] = useState(false);

    const Navigate = useNavigate();
    const Location = useLocation();

    const delete_product = (id) => {
        setLoading(true);
        Axios.put('http://localhost:3001/DeleteWorkshop' , {id : id}).then(() =>{
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
        <div id="Home" className='full-height'>
        {
            (Location.state.user === undefined)?<NavBar Received={{page : "W"}}/>:
                <NavBar Received={ {page : "W",status: Location.state.status, name: Location.state.name , user:Location.state.user , type:Location.state.type , id:Location.state.id} } />
        }
        {
            (Location.state.user === undefined)?<SideBar Received={null}/>:
            <SideBar Received={ {status: Location.state.status, name: Location.state.name , user:Location.state.user , type:Location.state.type , id:Location.state.id} } />
        }
        <div className='display-row'>
                {
                    (Loading)?
                    <div className='loader-main'>
                        <div className="loader"></div>
                        {/* <p className='loader-text'>Loading...</p> */}
                    </div>
                    :
                    (Products === [])?
                    <p>NOTHING FOUND</p>
                    :
                    Products.map((value) => {
                    return(
                        <div className='display-column' key={value._id} >
                            <div className='image-div'>
                                <img src={value.image[Math.floor((Math.random()*(value.image.length))+0)]} alt="Product" className='image'></img>
                                <div className='product-discount-div'>
                                    <p className='product-discount'>{parseInt(((parseInt(value.oldprice) - parseInt(value.newprice))/parseInt(value.oldprice))*100)}%</p>
                                    <p className='product-discount'>OFF</p>
                                </div>
                                {(Location.state!== null && Location.state.type === "admin")?
                                    <>
                                    <button className='delete-button' onClick={() => {delete_product(value._id)}}><i class="fi fi-sr-trash"></i></button>
                                    <button className='edit-button' onClick={() => { 
                                        Navigate('/editWorkshops' , 
                                        {
                                            state:{id : value._id , name: value.name , 
                                            description : value.description , newprice : value.newprice , 
                                            oldprice : value.oldprice ,
                                            user_status: Location.state.status, user_name : Location.state.name , user:Location.state.user , Product_id : value._id , type:Location.state.type , user_id:Location.state.id}} 
                                            )}
                                        }
                                    >
                                    <i class="fi fi-sr-pencil"></i>
                                    </button>
                                    </>:
                                    <></>
                                }
                            </div>
                            <div className='contents-div'>
                                <div className='contents'>
                                    <p className='product-name'>{value.name}</p>
                                    <p className='product-price'><s className='strike'><span className='text-color'>Rs:{value.oldprice}</span></s> Rs:{value.newprice}</p>
                                </div>
                                <div className='buttons'>
                                    {(Location.state === null)?
                                    <>
                                        <button className='add-button' onClick={()=>{
                                            Navigate("/Login")
                                        }}>ENROLL</button>
                                        <button className='view-button'
                                            onClick={()=>{
                                                setActiveProduct(value._id);
                                                setExpand(true);
                                            }}
                                        >
                                            <i className="fi fi-rr-eye end-icons view-icon"></i>
                                        </button>
                                    </>
                                    :
                                    <>
                                        <button className='add-button'
                                        onClick={() =>{
                                            Navigate("/WorkshopConfirmation" , {state:{ check: "in" , Product_id : value._id , status: Location.state.status, name : Location.state.name , user:Location.state.user , type:Location.state.type , id:Location.state.id}})
                                        }}>ENROLL</button>
                                        <button className='view-button'
                                            onClick={()=>{
                                                setActiveProduct(value._id);
                                                setExpand(true);
                                            }}
                                        >
                                            <i className="fi fi-rr-eye end-icons view-icon"></i>
                                        </button>
                                    </>
                                    }
                                </div>
                            </div>
                            <div className='clear'></div>
                        </div>
                        );
                    }
                )
            }
            {
                (Expand)?<>
                {(Location.state !== null)?
                <div className="pop w-100">
                <button className='Terminator' onClick={()=>{
                setExpand(false);
                }}><i class="fi fi-sr-cross"></i></button>
                <WorkshopView Received={{ check: "in" , Product_id : ActiveProduct , status: Location.state.status, name : Location.state.name , user:Location.state.user , type:Location.state.type , id:Location.state.id}}/>
                </div>
                :
                <div className="pop w-100">
                <button className='Terminator' onClick={()=>{
                setExpand(false);
                }}><i class="fi fi-sr-cross"></i></button>
                <WorkshopView Received={{ check: "out" , Product_id : ActiveProduct}}/>
                </div>}
                </>:<></>
            }
            </div>
        </div>
    )
}

export default Workshop;