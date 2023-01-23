import {useEffect , useState} from "react";
import "./searchbar.css";
import NavBar from './navbar';
import SideBar from './SideBar';
import { useLocation , useNavigate  } from 'react-router-dom';
import Axios from 'axios';
import ProductView from './ViewProduct';

function Search() {
    const [ Loading , setLoading ] = useState(false);
    const [ SearchThis , setSearchThis ] = useState(null);
    const [ Products , setProducts ] = useState([]);
    const [ ActiveProduct , setActiveProduct ] = useState(null);
    const [ Expand , setExpand ] = useState(false);

    const Location = useLocation();
    const Navigate = useNavigate();

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
        console.log(CartItems);
		Axios.put("http://localhost:3001/deleteWishList" , {id:Location.state.id , type : Location.state.type , file : CartItems}).then(()=>{
			Axios.put("http://localhost:3001/getCart" , {type : Location.state.type , id:Location.state.id}).then((response)=>{
                setCartItems(response.data[0].wishlist);
                setLoading(false);
            })
		});
	};

    const delete_product = (id) => {
        setLoading(true);
        Axios.put('http://localhost:3001/DeleteProduct' , {id : id}).then(() =>{
            setLoading(false);
            alert("Product Deleted");
        });
    };

    const Search = () => {
        setLoading(true);
        Axios.put("http://localhost:3001/getSearch" , {name : SearchThis}).then((response)=> {
            setProducts(response.data);
            setLoading(false);
        })
    }

    useEffect(()=>{
        setLoading(true);
        Axios.get("http://localhost:3001/getAllProducts").then((response) => {
            setProducts(response.data);
            if(Location.state !== null){
                Axios.put("http://localhost:3001/getCart" , {type : Location.state.type , id:Location.state.id}).then((response)=>{
                    setCartItems(response.data[0].wishlist);
                    setLoading(false);
            })}
            else{
                setLoading(false);
            }
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <>
            {
                (Location.state === null)?<NavBar Received={null}/>:
                <NavBar Received={ {status: Location.state.status, name: Location.state.name , user:Location.state.user , type:Location.state.type , id:Location.state.id} } />
            }
            {
                (Location.state === null)?<SideBar Received={null}/>:
                <SideBar Received={ {status: Location.state.status, name: Location.state.name , user:Location.state.user , type:Location.state.type , id:Location.state.id} } />
            }
            <form className="search-container">
                <input
                    type="text"
                    placeholder="Search..."
                    onChange={(e)=>{setSearchThis(e.target.value)}}
                />
                <button type="button" onClick={Search}>Search</button>
            </form>
            {
                (Loading)?<div class="loader"></div>:

                (Products.length === 0)?
                <p>NOTHING FOUND</p>
                :
                <>
                {
                    (Products === null)?
                    <p>No Search Results Found</p>
                    :
                    Products.map((value) => {
                return(
                    <div className='display-column' key={value._id} >
                            <div className='image-div'>
                                <img src={value.image[0]} alt="Product" className='image'></img>
                                <div className='product-discount-div'>
                                    <p className='product-discount'>{parseInt(((parseInt(value.oldprice) - parseInt(value.newprice))/parseInt(value.oldprice))*100)}%</p>
                                    <p className='product-discount'>OFF</p>
                                </div>
                                {(Location.state!== null && Location.state.type === "admin")?
                                    <>
                                    <button className='delete-button' onClick={() => {delete_product(value._id)}}><i class="fi fi-sr-trash"></i></button>
                                    <button className='edit-button' onClick={() => {
                                        Axios.post("http://localhost:3001/getProducts",{id : value._id}); 
                                        Navigate('/editProducts' , 
                                        {
                                            state:{id : value._id , name: value.name , 
                                            description : value.description , newprice : value.newprice , 
                                            oldprice : value.oldprice , category : value.category , 
                                            tags : value.tags , status : value.status, infos : value.extras, length : value.length , 
                                            height : value.height , width : value.width,
                                            user_status: Location.state.status, user_name : Location.state.name , user:Location.state.user , 
                                            Product_id : value._id , type:Location.state.type , user_id:Location.state.id}} )}
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
                                        }}>ADD TO CART</button>
                                        <button className='wish-button' onClick={()=>{
                                            Navigate("/Login")
                                        }}><i class="fi fi-rs-heart end-icons wish-icon"></i></button>
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
                                            setLoading(true);
                                            Axios.put("http://localhost:3001/addToCart" , {type : Location.state.type , id:Location.state.id , user:Location.state.user , product_id:value._id}).then(() =>{
                                                setLoading(false);
                                                Navigate("/cart" , { state: {status: Location.state.status, name : Location.state.name , user:Location.state.user , type:Location.state.type , id:Location.state.id} })
                                            });
                                        }}>ADD TO CART</button>
                                        {(CartItems.includes(value._id , 0) || OnPageCart.includes(value._id))?
                                            <button className='wish-button'
                                         onClick={() =>{
                                            Delete(value._id);
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
                                setCartItems(response.data[0].wishlist);
                                setLoading(false);
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
                                setCartItems(response.data[0].wishlist);
                                setLoading(false);
                        })}
                    else{
                        setLoading(false);}
                    }}><i class="fi fi-sr-cross"></i></button>
                    <ProductView Received={{ check: "out" , Product_id : ActiveProduct}}/>
                    </div>}
                    </>:<></>
                }
        </>
    );
};

export default Search;