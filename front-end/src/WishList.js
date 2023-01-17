import { useState , useEffect } from 'react';
import { useNavigate , useLocation } from 'react-router-dom';
import Axios  from 'axios';
import NavBar from './navbar';
import './product_card.css';
import './cart.css';

function WishList(){

    const Delete = (id) => {
		setLoading(true);
		for(var i=0;i<OnCart.length;i++){
			if(OnCart[i] === id){
				OnCart.splice(i,1);
			}
		}
        console.log(OnCart);
		Axios.put("http://localhost:3001/deleteWishList" , {id:Location.state.id , type : Location.state.type , file : OnCart}).then(()=>{
			Axios.put("http://localhost:3001/getCart" , {type : Location.state.type , id:Location.state.id}).then((response)=>{
                setOnCart(response.data[0].on_cart);
                Axios.put("http://localhost:3001/getSelectedProducts" , {id:response.data[0].wishlist}).then((response1) => {
                    setCartItems(response1.data);
                    setLoading(false);
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
            Axios.put("http://localhost:3001/getSelectedProducts" , {id:response.data[0].wishlist}).then((response1) => {
                setCartItems(response1.data);
                setLoading(false);
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
                </div>
                }
                </>
            }
        </>
    )
}

export default WishList;
