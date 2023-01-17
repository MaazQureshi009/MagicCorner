import { useState , useEffect } from 'react';
import { useNavigate , useLocation } from 'react-router-dom';
import Axios  from 'axios';
import NavBar from './navbar';
import './product_card.css';
import './cart.css';

function Cart(){

    const [ Total , setTotal ] = useState(0);

    const Calculation = ( Received ) => {
        var T =0;
        for(var j = 0; j< Received.length ; j++){
            T = T + parseInt(Received[j].newprice);
        }
        setTotal(T);
        setLoading(false);
    }

    const Delete = (id) => {
		setLoading(true);
		for(var i=0;i<OnCart.length;i++){
			if(OnCart[i] === id){
				OnCart.splice(i,1);
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

    useEffect(() => {
        setLoading(true);
        Axios.put("http://localhost:3001/getCart" , {type : Location.state.type , id:Location.state.id}).then((response)=>{
            setOnCart(response.data[0].on_cart);
            Axios.put("http://localhost:3001/getSelectedProducts" , {id:response.data[0].on_cart}).then((response1) => {
                setCartItems(response1.data);
                Calculation(response1.data);
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
                (Loading)?<div class="loader"></div>:
                <>
                {
                    (CartItems.length === 0)?
                        <p>Nothing Here</p>:
                        <div className='rowww'>
                    {
                        CartItems.map((key) => {
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
                                        <button className='button'
                                            onClick={() =>{
                                                Navigate("/displayProducts");
                                            }}
                                        >
                                            VIEW
                                            <i class="fi fi-rr-eye end-icons"></i>
                                        </button>
                                        <button className='general-button delete' onClick={() => {
													Delete(key._id)
												}}>
                                                <i class="fi fi-rr-trash"></i>
                                        </button>
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
            <a
                href="https://wa.me/2348100000000"
                class="whatsapp_float"
                target="_blank"
                rel="noopener noreferrer"
            >
                <i class="fa fa-whatsapp whatsapp-icon"></i>
            </a>
        </>
    )
}

export default Cart;
