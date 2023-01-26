import { useState , useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Axios from 'axios';

import NavBar from './navbar';
import SideBar from './SideBar';

import './admin_dashboard.css';

function AdminDashBoard(){
    const Location = useLocation();

    const [ Orders , setOrders ] = useState([]);
    const [ Status , setStatus ] = useState(null);
    const [ InProgress , setInProgress ] = useState("0");
    const [ UserData , setUserData ] = useState([]);
    const [ Offers , setOffers ] = useState([]);
    const [ OfferName , setOfferName ] = useState(null);
    const [ OfferMin , setOfferMin ] = useState(null);
    const [ OfferValue , setOfferValue ] = useState(null);
    const [ OfferType , setOfferType ] = useState(null);
    const [ Expand , setExpand ] = useState("");
    const [ Loading , setLoading ] = useState(false);
    const [ Colors ,setColors ] = useState([]);
    const [ Open , setOpen ] = useState(false);  

    const Calculations = (response) => {
        let Sum = 0;
        for(var i = 0 ; i < response.length ; i++){
            if(response[i].status !== "DELIVERED"){
                Sum=Sum+1;
            }
        }
        setInProgress(String(parseFloat(parseFloat(Sum)/parseFloat(response.length))*100))
    }

    const AddOffer = () => {
        setLoading(true);
        Axios.put("http://localhost:3001/addOffers" , { name : OfferName , min : OfferMin , discount : OfferValue , type : OfferType }).then(
            ()=>{
                Axios.get("http://localhost:3001/getOrders").then((response)=>{
                    setOrders(response.data);
                    Calculations(response.data);
                    Axios.put("http://localhost:3001/getCart" , {type : Location.state.type , id:Location.state.id}).then((response)=>{
                        setUserData(response.data[0]);
                        Axios.get("http://localhost:3001/getOffers").then((response)=>{
                            setOffers(response.data);
                            setLoading(false);
                            setOpen(false);
                        });
                    });
                });
            }
        )
    }

    const UpdateOrder = (id) => {
        setLoading(true);
        Axios.put("http://localhost:3001/updateOrder" , { id : id , status : Status }).then(
            ()=>{
                Axios.get("http://localhost:3001/getOrders").then((response)=>{
                    setOrders(response.data);
                    Calculations(response.data);
                    Axios.put("http://localhost:3001/getCart" , {type : Location.state.type , id:Location.state.id}).then((response)=>{
                        setUserData(response.data[0]);
                        Axios.get("http://localhost:3001/getOffers").then((response)=>{
                            setOffers(response.data);
                            setLoading(false);
                            setOpen(false);
                        });
                    });
                });
            }
        )
    }

    const DeleteOffer = (id) => {
        setLoading(true);
        Axios.put("http://localhost:3001/deleteOffers" , { id: id }).then(
            ()=>{
                Axios.get("http://localhost:3001/getOrders").then((response)=>{
                    setOrders(response.data);
                    Calculations(response.data);
                    Axios.put("http://localhost:3001/getCart" , {type : Location.state.type , id:Location.state.id}).then((response)=>{
                        setUserData(response.data[0]);
                        Axios.get("http://localhost:3001/getOffers").then((response)=>{
                            setOffers(response.data);
                            setLoading(false);
                            setOpen(false);
                        });
                    });
                });
            }
        )
    }

    useEffect(()=>{
        setLoading(true);
        setColors([ {"BackgroundColor":"#DD5353" , "ForegroundColor":"#FFF8EA"} , {"BackgroundColor":"#54BAB9" , "ForegroundColor":"#FFF8EA"} ,
        {"BackgroundColor":"#9AD0EC" , "ForegroundColor":"black"} , {"BackgroundColor":"#FFBD35" , "ForegroundColor":"black"}
        , {"BackgroundColor":"#AE431E" , "ForegroundColor":"white"} , {"BackgroundColor":"#558776" , "ForegroundColor":"#EAE2B6"}
        , {"BackgroundColor":"#D8C292" , "ForegroundColor":"#C19065"}]);
        Axios.get("http://localhost:3001/getOrders").then((response)=>{
            setOrders(response.data);
            Calculations(response.data);
            Axios.put("http://localhost:3001/getCart" , {type : Location.state.type , id:Location.state.id}).then((response)=>{
                setUserData(response.data[0]);
                Axios.get("http://localhost:3001/getOffers").then((response)=>{
                    setOffers(response.data);
                    setLoading(false);
                });
            });
        });
        console.log(Colors);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return(
        <div id="Home">
            {
                (Location.state === null)?<NavBar Received={null}/>:
                <NavBar Received={ {status: Location.state.status, name: Location.state.name , user:Location.state.user , type:Location.state.type , id:Location.state.id} } />
            }
            {
                (Location.state === null)?<SideBar Received={null}/>:
                <SideBar Received={ {status: Location.state.status, name: Location.state.name , user:Location.state.user , type:Location.state.type , id:Location.state.id} } />
            }
            {
                (Loading)?
                <div className='loader-main'>
                    <div className="loader"></div>
                    <p className='loader-text'>Loading...</p>
                </div>
                :
                <>
                    <div className='row data'>
                        <img src={UserData.image} alt="Profile" className='col-2 profile' />
                        <div className='col-5 personal-data'>
                            <p className='admin-name'>{UserData.full_name}</p>
                            <p className='admin'>ADMIN</p>
                            <p className='admin-mail'>{UserData.email}</p>
                            <p className='admin-mobile'>{UserData.mobile_no}</p>
                            <p>{UserData._id}</p>
                        </div>
                        <div className='col-2 in-progress-div-one'>
                            <CircularProgressbar value={InProgress} text={`${InProgress}%`} 
                                styles={buildStyles({pathTransitionDuration: 1000, trailColor: '#D6EFC7',textColor: '#40514E', backgroundColor: 'white', pathColor: '#40514E'})} 
                            />
                            <p>Order's On Progress</p>
                        </div>
                        <div className='col-2 in-progress-div-two'>
                            <CircularProgressbar value={70} text={`70%`} 
                                styles={buildStyles({pathTransitionDuration: 1000, trailColor: '#E4F9F5',textColor: '#355C7D', backgroundColor: 'white', pathColor: '#355C7D'})} 
                            />
                            <p>Queries Pending</p>
                        </div>
                    </div>
                    <div className='row offers'>
                        <h1 className='col-12 head'>OFFER'S</h1>
                        <div className='col-3'>
                            {
                                (Open)?
                                <>
                                <div className='opened-offer-div'>
                                    <div className='container'>
                                    <button className='close-button' onClick={()=>{setOpen(false)}}><i class="fi fi-br-cross"></i></button>
                                        <input type="text" className='add-offer-input' placeholder='Offer Name' onChange={(e)=>{setOfferName(e.target.value)}} />
                                        <input type="text" className='add-offer-input' placeholder='Minimum Value' onChange={(e)=>{setOfferMin(e.target.value)}} />
                                        <input type="text" className='add-offer-input' placeholder='Discount' onChange={(e)=>{setOfferValue(e.target.value)}} />
                                        <select className='add-offer-input' onChange={(e)=>{setOfferType(e.target.value)}}>
                                            <option value="S">SELECT</option>
                                            <option value="P">PERCENTAGE</option>
                                            <option value="A">AMOUNT</option>
                                        </select>
                                        <button onClick={()=>{AddOffer()}} className='offer-add-button'>ADD</button>
                                    </div>
                                </div>
                                </>
                                :
                                <div className='offer-div'>
                                    <button className='offer-button' onClick={()=>{setOpen(true)}}><i className="fi fi-br-plus offer-icon"></i></button>
                                </div>
                            }
                        </div>
                        {
                            Offers.map((value)=>{
                                return(
                                    <div className='col-2 offer-div-valid' style={{backgroundColor:Colors[Math.floor((Math.random()*7)+0)].BackgroundColor , color:"white" , boxShadow:" 0 0 0.3em black"}}>
                                        <p className='offer-name'>{value.name}</p>
                                        {
                                            (value.method === "P")?
                                            <p className='offer-value'>{value.discount}% off</p>
                                            :
                                            <p className='offer-value'><i class="fa-solid fa-indian-rupee-sign"></i>{value.discount} off</p>
                                        }
                                        <p className='offer-rest'>on shopping</p>
                                        <p className='offer-rest'><i class="fa-solid fa-indian-rupee-sign"></i>{value.min_price} & Above</p>
                                        <button onClick={()=>{DeleteOffer(value._id)}} className='offer-delete-button'><i class="fi fi-sr-trash"></i></button>
                                    </div>
                                );
                            })
                        }
                    </div>
                    <div className='main-orders-div container-fluid'>
                        <h1>ORDER'S</h1>
                        {
                            Orders.map((value)=>{
                                return(
                                    <div className='container w-100 row order-row'>
                                        <p className='col-5 order-column order-id'>Order Id : {value._id}</p>
                                        <p className='col-3 order-column'>Order Status : {value.status}</p>
                                        <p className='col-2 order-column'>Payment Status : {value.payment_mode}</p>
                                        {
                                            (Expand === value._id)?
                                            <>
                                                <p className='col-2 order-column'>
                                                    <button className='expand-button'
                                                        onClick={()=>{setExpand("")}}
                                                    >
                                                        <p className='button-text'>Hide Details</p>
                                                        <i class="fa-solid fa-chevron-up end-icon"></i>
                                                    </button>
                                                </p>
                                                <p className='col-10 order-column order-id'> Ordered By :</p>
                                                <p className='col-2 order-column'> TOTAL : Rs {value.total}/-</p>
                                                <p className='col-12 order-column order-details'>Name : {value.name}</p>
                                                <p className='col-12 order-column order-details'>Email : {value.email}</p>
                                                <p className='col-12 order-column order-details'>Contact : {value.mobile}</p>
                                                <p className='col-12 order-column order-details'>Delivery Address : {value.address}</p>
                                                {
                                                    (value.status !== "DELIVERED")?
                                                    <div className='float-end button-div'>
                                                        <select className='select' onChange={(e)=>{setStatus(e.target.value)}}>
                                                            <option>SELECT</option>
                                                            <option>SAILING</option>
                                                            <option>SHIPPED</option>
                                                            <option>OFD</option>
                                                            <option>DELIVERED</option>
                                                        </select>
                                                        <button className='update-button' onClick={()=>{UpdateOrder(value._id)}}>
                                                            <p className='button-text'>UPDATE STATUS</p>
                                                            <i class="fa-solid fa-pen end-icon"></i>
                                                        </button>
                                                    </div>
                                                    :<></>
                                                }
                                            </>
                                            :
                                            <p className='col-2 order-column'>
                                                <button className='expand-button'
                                                    onClick={()=>{setExpand(value._id)}}
                                                >
                                                    <p className='button-text'>Show Details</p>
                                                    <i class="fa-solid fa-chevron-down end-icon"></i>
                                                </button>
                                            </p>
                                        }
                                        <div className='clear'></div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </>
            }
        </div>
    );
}

export default AdminDashBoard;