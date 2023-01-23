import { useState , useEffect } from 'react';
import { useNavigate , useLocation } from 'react-router-dom';
import Axios  from 'axios';
import NavBar from './navbar';
import ProductView from './ViewProduct';
import SideBar from './SideBar';
import './product_card.css';
import './cart.css';

function Cart(){

    const [ Total , setTotal ] = useState(0);
    const [ ActiveProduct , setActiveProduct ] = useState(null);
    const [ Expand , setExpand ] = useState(false);

    const Calculation = ( Received ) => {
        var T =0;
        for(var j = 0; j< Received.length ; j++){
            T = T + parseInt(Received[j].newprice);
        }
        setTotal(T);
        setLoading(false);
    }

    const Delete = (id) => {
        console.log(id);
		setLoading(true);
		for(var i=0;i<OnCart.length;i++){
			if(OnCart[i] === id){
				OnCart.splice(i,2);
			}
		}
        console.log(OnCart);
		Axios.put("http://localhost:3001/deleteMe" , {id:Location.state.id , type : Location.state.type , file : OnCart}).then(()=>{
			Axios.put("http://localhost:3001/getCart" , {type : Location.state.type , id:Location.state.id}).then((response)=>{
                setOnCart(response.data[0].on_cart);
                Axios.put("http://localhost:3001/getSelectedProducts" , {id:response.data[0].on_cart}).then((response1) => {
                    setCartItems(response1.data);
                    Calculation(response1.data);
                })
            })
		});
	};

    const Navigate = useNavigate();
    const Location = useLocation();

    const [ OnCart , setOnCart ] = useState([]);
    const [ CartItems , setCartItems ] = useState([]);
    const [ Loading , setLoading ] = useState(false);

    const [ WishList , setWishList ] = useState([]);
    const [ OnPageCart , setOnPageCart ] = useState([]);

    const DeleteWishlist = (id) => {
		setLoading(true);
        console.log(id);
        console.log(CartItems);
		for(var i=0;i<CartItems.length;i++){
			if(CartItems[i] === id){
				CartItems.splice(i,2);
			}
		}
        for(var j=0; j<OnPageCart.length ; j++){
            if(OnPageCart[j]=== id){
                OnPageCart.splice(j,1);
            }
        }
        console.log(CartItems);
		Axios.put("http://localhost:3001/deleteWishList" , {id:Location.state.id , type : Location.state.type , file : CartItems}).then(()=>{
			Axios.put("http://localhost:3001/getCart" , {type : Location.state.type , id:Location.state.id}).then((response)=>{
                setWishList(response.data[0].wishlist);
                setLoading(false);
            })
		});
	};

    useEffect(() => {
        setLoading(true);
        Axios.put("http://localhost:3001/getCart" , {type : Location.state.type , id:Location.state.id}).then((response)=>{
            setOnCart(response.data[0].on_cart);
            Axios.put("http://localhost:3001/getSelectedProducts" , {id:response.data[0].on_cart}).then((response1) => {
                setCartItems(response1.data);
                Calculation(response1.data);
                Axios.put("http://localhost:3001/getCart" , {type : Location.state.type , id:Location.state.id}).then((response)=>{
                        setWishList(response.data[0].wishlist);
                        setLoading(false);
                })
            })
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
        },[]);

    return(
        <>
            {
                (Location.state === null)?<NavBar Received={null}/>:
                <NavBar Received={ {status: Location.state.status, name: Location.state.name , user:Location.state.user , type:Location.state.type , id:Location.state.id} } />
            }
            {
                (Location.state === null)?<SideBar Received={null}/>:
                <SideBar Received={ {status: Location.state.status, name: Location.state.name , user:Location.state.user , type:Location.state.type , id:Location.state.id} } />
            }
            {
                (Loading)?<div class="loader"></div>:
                <>
                {
                    (CartItems.length === 0)?
                        <p>Nothing Here</p>:
                        <div className='display-row'>
                    {
                        CartItems.map((value) => {
                        return(
                            <div className='display-column' key={value._id} >
                            <div className='image-div'>
                                <img src={value.image[0]} alt="Product" className='image'></img>
                                <div className='product-discount-div'>
                                    <p className='product-discount'>{parseInt(((parseInt(value.oldprice) - parseInt(value.newprice))/parseInt(value.oldprice))*100)}%</p>
                                    <p className='product-discount'>OFF</p>
                                </div>
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
                                        }}>REMOVE</button>
                                        <button className='wish-button' onClick={()=>{
                                            Navigate("/Login")
                                        }}><i class="fi fi-rs-heart end-icons"></i></button>
                                        <button className='view-button'
                                        onClick={()=>{
                                            setActiveProduct(value._id);
                                            setExpand(true);
                                        }}
                                        >
                                            <i className="fi fi-rr-eye end-icons"></i>
                                        </button>
                                    </>
                                    :
                                    <>
                                        <button className='remove-button'
                                        onClick={() =>{
                                            Delete(value._id);
                                        }}>REMOVE</button>
                                        {(WishList.includes(value._id , 0) || OnPageCart.includes(value._id))?
                                            <button className='wish-button'
                                         onClick={() =>{
                                            DeleteWishlist(value._id);
                                        }}
                                        ><i class="fi fi-ss-heart end-icons full-wish-icon"></i></button>:
                                            <button className='wish-button'
                                         onClick={() =>{
                                            setLoading(true);
                                            Axios.put("http://localhost:3001/addToWishList" , {type : Location.state.type , id:Location.state.id , user:Location.state.user , product_id:value._id}).then(() =>{
                                                setOnPageCart((p) => [...p , value._id])
                                                setLoading(false);
                                            });
                                        }}
                                        ><i class="fi fi-rs-heart end-icons wish-icon"></i></button>}
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
                    <div className="checkout">
                        <div className="checkout-btn">
                            <button type="button">Checkout</button>
                        </div>
                        <div className="show_price">
                            <h4>Sub Total : Rs <span className='price'>{Total} /-</span></h4>
                        </div>
                    </div>
                </div>
                }
                </>
            }
            {
                (Expand)?<>
                {(Location.state !== null)?
                <div className="pop w-100">
                <button className='Terminator' onClick={()=>{
                setExpand(false)
                setLoading(true);
                if(Location.state !== null){
                    Axios.put("http://localhost:3001/getCart" , {type : Location.state.type , id:Location.state.id}).then((response)=>{
                        setOnCart(response.data[0].on_cart);
                        Axios.put("http://localhost:3001/getSelectedProducts" , {id:response.data[0].on_cart}).then((response1) => {
                            setCartItems(response1.data);
                            Calculation(response1.data);
                            Axios.put("http://localhost:3001/getCart" , {type : Location.state.type , id:Location.state.id}).then((response)=>{
                                setWishList(response.data[0].wishlist);
                                setLoading(false);
                        })
                        })
                    })}
                else{
                    setLoading(false);}
                }}><i class="fi fi-sr-cross"></i></button>
                <ProductView Received={{ check: "in" , Product_id : ActiveProduct , status: Location.state.status, name : Location.state.name , user:Location.state.user , type:Location.state.type , id:Location.state.id}}/>
                </div>
                :
                <div className="pop w-100">
                <button className='Terminator' onClick={()=>{
                setExpand(false)
                setLoading(true);
                if(Location.state !== null){
                    Axios.put("http://localhost:3001/getCart" , {type : Location.state.type , id:Location.state.id}).then((response)=>{
                        setOnCart(response.data[0].on_cart);
                        Axios.put("http://localhost:3001/getSelectedProducts" , {id:response.data[0].on_cart}).then((response1) => {
                            setCartItems(response1.data);
                            Calculation(response1.data);
                            Axios.put("http://localhost:3001/getCart" , {type : Location.state.type , id:Location.state.id}).then((response)=>{
                                setWishList(response.data[0].wishlist);
                                setLoading(false);
                        })
                        })
                    })}
                else{
                    setLoading(false);}
                }}><i class="fi fi-sr-cross"></i></button>
                <ProductView Received={{ check: "out" , Product_id : ActiveProduct}}/>
                </div>}
                </>:<></>
            }
        </>
    )
}

export default Cart;
