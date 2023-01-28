import {useEffect , useState} from 'react';
import Axios from 'axios';
import { useNavigate , useLocation , Link } from 'react-router-dom';
import './ViewProduct.css';
import NavBar from './navbar';
import './product_card.css';

const ProductView = (Received) => {

    const Navigate = useNavigate();
    const Location = useLocation();
    const [ ActiveImage , setActiveImage ] = useState("")
    const [ NonActiveImage , setNonActiveImage ] = useState([])
    const [ Loading , setLoading ] = useState(true);
    const [ Item, setItem ] = useState([]);
    const [ CartItems , setCartItems ] = useState([]);
    const [ OnPageCart , setOnPageCart ] = useState([]);

    const Delete = (id) => {
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
		Axios.put("http://localhost:3001/deleteWishList" , {id:Received.Received.id , type : Received.Received.type , file : CartItems}).then(()=>{
			Axios.put("http://localhost:3001/getCart" , {type : Received.Received.type , id:Received.Received.id}).then((response)=>{
                setCartItems(response.data[0].wishlist);
                setLoading(false);
            })
		});
	};

    useEffect( () => {
        console.log(Received.Received)
        setLoading(true);
        Axios.put("http://localhost:3001/getSelectedProducts" , {id:Received.Received.Product_id}).then((response) => {
            setItem(response.data[0]);
            console.log(response.data);
            setActiveImage(response.data[0].image[0])
            setNonActiveImage(response.data[0].image)
            console.log(Received.Received.check)
            if(Received.Received.check !== "out"){
                Axios.put("http://localhost:3001/getCart" , {type : Received.Received.type , id:Received.Received.id}).then((response)=>{
                    setCartItems(response.data[0].wishlist);
                    setLoading(false);
            })}
            else{
                setLoading(false);
                }
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return (
        <div className="view-pop">
            {
                (Loading)?
                <div className='loader-main'>
                    <div className="loader"></div>
                    <p className='loader-text'>Loading...</p>
                </div>
                :
                < >
                    <div className='container col-6 float-start  mt-2'>
                        <div className="col-12 active-image-div">
                            <img src={ActiveImage} alt="MainImage" className="active-image" />
                        </div>
                        <div className="row">
                            {NonActiveImage.map((value) => {
                                return(
                                    <>
                                        <img key={value} src={value} alt="SubImages" className='col-1 n-active-images' onClick={() => {setActiveImage(value)}} />
                                    </>);
                            })}
                        </div>
                    </div>
                    <div className='container col-6 float-start mt-2 content-div'>
                        <p className="view-product-name">{Item.name}</p>
                        {
                            (Item.cod !== "YES")?
                            <p className='view-warning'>NO CASH ON DELIVER AVAILABLE</p>
                            :<></>
                        }
                        <p className="product-description">{Item.description}</p>
                        <p className="product-description">Dimensions : {Item.length} X {Item.width} X {Item.height} M(L x B x H)</p>
                        <p className="product-extras">Seller Tell's:</p>
                        <p>{Item.extras}</p>
                        <p className="product-discount-price">{parseInt(((parseInt(Item.oldprice) - parseInt(Item.newprice))/parseInt(Item.oldprice))*100)}% off</p>
                        <s className="strike"><p className="slashed-price">Rs: {Item.oldprice}</p></s>
                        <p className="live-price">Rs: {Item.newprice}</p>
                        {(Received.Received.check === "in")?
                        <>
                            <button className="cart-button" onClick={() =>{
                                setLoading(true);
                                Axios.put("http://localhost:3001/addToCart" , {type : Received.Received.type , id:Received.Received.id , user:Received.Received.user , product_id:Item._id}).then(() =>{
                                    setLoading(false);
                                    Navigate("/cart" , { state: {status: Received.Received.status, name : Received.Received.name , user:Received.Received.user , type:Received.Received.type , id:Received.Received.id} })
                                });
                            }}>ADD TO CART</button>
                            {(CartItems.includes(Item._id , 0) || OnPageCart.includes(Item._id))?
                                <button className='wish-button'
                                onClick={() =>{
                                Delete(Item._id);
                            }}
                            ><i class="fi fi-ss-heart end-icons full-wish-icon"></i></button>:
                                <button className='wish-button'
                                onClick={() =>{
                                setLoading(true);
                                Axios.put("http://localhost:3001/addToWishList" , {type : Received.Received.type , id:Received.Received.id , user:Received.Received.user , product_id:Item._id}).then(() =>{
                                    setOnPageCart((p) => [...p , Item._id])
                                    setLoading(false);
                                });
                            }}><i class="fi fi-rs-heart end-icons wish-icon"></i></button>}
                        </>:
                        <>
                        <button className="cart-button" onClick={() =>{Navigate("/Login")}}>ADD TO CART</button>
                        <button className='wish-button' onClick={()=>{
                        Navigate("/Login")
                        }}><i class="fi fi-rs-heart end-icons"></i></button>
                        </>
                        }
                    </div>
                </>
            }
        </div>
    )
}

export default ProductView;