import {useEffect , useState} from "react";
import "./searchbar.css";
import NavBar from './navbar';
import { useLocation , useNavigate  } from 'react-router-dom';
import Axios from 'axios';

function Search() {
    const [ Loading , setLoading ] = useState(false);
    const [ SearchThis , setSearchThis ] = useState(null);
    const [ Products , setProducts ] = useState(null);

    const Location = useLocation();
    const Navigate = useNavigate();

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
            setLoading(false);
        })
    },[])

    return (
        <>
            {
                (Location.state === null)?<NavBar Received={null}/>:
                <NavBar Received={ {status: Location.state.status, name: Location.state.name , user:Location.state.user , type:Location.state.type , id:Location.state.id} } />
            }
            <form className="search-container">
                <input
                    type="text"
                    placeholder="Search..."
                    onChange={(e)=>{setSearchThis(e.target.value)}}
                />
                <input type="button" value="Search" onClick={Search} />
            </form>
            {
                (Loading)?<div class="loader"></div>:

                (Products === null)?
                <p>NOTHING FOUND</p>
                :
                <>
                {
                    (Products === null)?
                    <p>No Search Results Found</p>
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
    );
};

export default Search;