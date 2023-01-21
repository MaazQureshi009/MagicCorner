import {useEffect , useState} from 'react';
import Axios from 'axios';
import { useNavigate , useLocation } from 'react-router-dom';
import './ViewProduct.css';
import NavBar from './navbar';
import './product_card.css';

const ProductView = () => {

    const Navigate = useNavigate();
    const Location = useLocation();

    const [Final,setFinal] = useState(null);

    const RelatedItems = [];

    const [ Loading , setLoading ] = useState(true);
    const [ Item, setItem ] = useState([]);

    const RemoveDuplicate = (RelatedCategory , RelatedTags) => {
        var found = 0;
        for(var i =0 ;i < RelatedCategory.length ; i++){
            for( var j = 0; j < RelatedTags.length ; j ++){
                if(RelatedCategory[i]._id !== RelatedTags[j]._id){
                    if(RelatedItems.length === 0){
                        RelatedItems.push(RelatedTags[j]);
                    }
                    else{
                        for(var k =0 ; k< RelatedItems.length ; k++){
                            if(RelatedItems[k]._id === RelatedTags[j]._id){
                                found = found +1;
                            }
                        }
                        if(found === 0){
                            RelatedItems.push(RelatedTags[j]);
                        }
                        if( j === RelatedTags.length - 1){
                            RelatedItems.push(RelatedCategory[i]);
                            break;
                        }
                    }
                }
            }
            setFinal(RelatedItems);
        }
        setLoading(false);
    }

    useEffect( () => {
        setLoading(true);
        Axios.put("http://localhost:3001/getSelectedProducts" , {id:Location.state.Product_id}).then((response) => {
            setItem(response.data);
            Axios.put("http://localhost:3001/getProducts" , {Category : response.data[0].category , Tag : "All"}).then((response1)=>{
                Axios.put("http://localhost:3001/getProducts" , {Category : "All" , Tag : response.data[0].tags}).then((response2)=>{
                    RemoveDuplicate(response1.data , response2.data);
                })
            })
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return (
        <>
            {
            (Location.state.check === "out")?<NavBar Received={null}/>:
            <NavBar Received={ {status: Location.state.status, name : Location.state.name , user:Location.state.user , type:Location.state.type , id:Location.state.id} } />
            }
            {
                (Loading)?
                <div class="loader"></div>
                :
                <>
                <div className="container mt-5 mb-5">
                <div className="row d-flex justify-content-center">
                <div className="col-md-12">
                <div className="card">
                <div className="row">
                <div className="col-md-6">
                <div className="images p-3">
                <div className="text-center p-4"> <img id="main-image" src={Item[0].image} alt='product' width="280" />
                </div>
                </div>
                </div>

                <div className="col-md-6">
                <div className="product p-4">
                                        
                <div className="mt-2 mb-3 mr-0 ms-0">
                <h3 className="flex-row d-flex">{Item[0].name}</h3>
                </div>
                <p className="description d-flex text-start">
                {Item[0].description}
                </p>

                <div className="price d-flex flex-row align-items-center">
                <span className="discout-price">Discount : {parseInt(((parseInt(Item[0].oldprice) - parseInt(Item[0].newprice))/parseInt(Item[0].oldprice))*100)} %</span>
                </div>

                <div className="price d-flex flex-row align-items-center">
                <span className="act-price">Price : {Item[0].newprice} /-</span>
                </div>
                {
                    (Location.state.check === "in")?
                    <div className="cart mt-4 d-flex align-self-start mr-auto">
                    <button className="btn btn-danger px-4"
                        onClick={() =>{
                            setLoading(true);
                            Axios.put("http://localhost:3001/addToCart" , {type : Location.state.type , id:Location.state.id , user:Location.state.user , product_id:Item[0]._id}).then(() =>{
                                setLoading(false);
                                Navigate("/cart" , { state: {status: Location.state.status, name : Location.state.name , user:Location.state.user , type:Location.state.type , id:Location.state.id} })
                            });
                        }}
                    >Add to cart</button>
                    <button className="wishlist-btn" 
                        onClick={() =>{
                            setLoading(true);
                            Axios.put("http://localhost:3001/addToWishList" , {type : Location.state.type , id:Location.state.id , user:Location.state.user , product_id:Item[0]._id}).then(() =>{
                                setLoading(false);
                                Navigate("/WishList" , { state: {status: Location.state.status, name : Location.state.name , user:Location.state.user , type:Location.state.type , id:Location.state.id} })
                            });
                        }}
                    ><i className='heart-icon fa fa-heart fa-2x px-3'></i></button>
                    </div>
                    :
                    <p>Login</p>
                }                     
                </div>
                </div>
                </div>
                </div>
                </div>
                </div>
                </div>
                <p id='header'>Related Products</p>
                <div className='rowww'>
                    {
                        (RelatedItems !== [])?<>
                        {
                        Final.map((key) => {
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
                                            onClick={()=>{Navigate("/ViewProduct" , 
                                            {state:{check: "out" ,Product_id : key._id}})
                                            window.location.reload(true);
                                            }
                                            }
                                        >
                                            VIEW
                                            <i class="fi fi-rr-eye end-icons"></i>
                                        </button>
                                        :
                                        <button className='button'
                                            onClick={()=>{Navigate("/ViewProduct" , 
                                            {state:{ check: "in" , status: Location.state.status, name : Location.state.name , user:Location.state.user , Product_id : key._id , type:Location.state.type , id:Location.state.id}})
                                            window.location.reload(true);
                                            }}
                                        >
                                            VIEW
                                            <i class="fi fi-rr-eye end-icons"></i>
                                        </button>
                                        }
                                    </div>
                                </div>
                                <div className='clear'></div>
                            </div>
                            );
                        }
                        )}
                        </>
                        :
                        <p>Empty</p>
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
                </>
            }
        </>
    )
}

export default ProductView;