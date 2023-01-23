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

    useEffect( () => {
        console.log(Received.Received)
        setLoading(true);
        Axios.put("http://localhost:3001/getSelectedWorkShops" , {id:Received.Received.Product_id}).then((response) => {
            setItem(response.data[0]);
            setActiveImage(response.data[0].image[0]);
            setNonActiveImage(response.data[0].image);
            setLoading(false);
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return (
        <div className="view-pop">
            {
                (Loading)?
                <div class="loader"></div>
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
                        <p className="product-description">{Item.description}</p>
                        <p className="product-discount-price">{parseInt(((parseInt(Item.oldprice) - parseInt(Item.newprice))/parseInt(Item.oldprice))*100)}% off</p>
                        <s className="strike"><p className="slashed-price">Rs: {Item.oldprice}</p></s>
                        <p className="live-price">Rs: {Item.newprice}</p>
                        {(Received.Received.check === "in")?
                        <>
                            <button className="cart-button" onClick={() =>{}}>ENROLL</button>
                        </>:
                        <>
                        <button className="cart-button" onClick={() =>{Navigate("/Login")}}>ENROLL</button>
                        </>
                        }
                    </div>
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
        </div>
    )
}

export default ProductView;