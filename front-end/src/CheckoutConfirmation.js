import { useState , useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Axios from 'axios';
import './CheckoutConfirmation.css';

function Confirmation(){
    const Location = useLocation();

    const [ House , setHouse ] = useState(null)
    const [ Street , setStreet ] = useState(null)
    const [ Area , setArea ] = useState(null)
    const [ City , setCity ] = useState(null)
    const [ State , setState ] = useState(null)
    const [ OnCart , setOnCart ] = useState([])
    const [ Total , setTotal ] = useState(null)
    const [ AddressConfirmation , setAddressConfirmation ] = useState(false);
    const [ TCConfirmation , setTCConfirmation ] = useState(false);
    const [ PaymentMode , setPaymentMode ] = useState(null)
    const [ Loading , setLoading ] = useState(false)

    const Calculation = ( Received ) => {
        var T =0;
        for(var j = 0; j< Received.length ; j++){
            T = T + parseInt(Received[j].newprice);
        }
        setTotal(T);
        setLoading(false);
    }

    const HandleClick = () => {
        if(AddressConfirmation === false){
            alert("Agree our Conditions");
        }
        if(TCConfirmation === false){
            alert("Verify your address");
        }
        if(PaymentMode === "COD"){
            alert("Order Placed");
        }
        else if(PaymentMode === "PN"){
            alert("Thank you for choosing Pay Now");
        }
        else{
            alert("Select Payment Mode");
        }
    }

    useEffect(()=>{
        if(Location.state.type === "user"){
            setLoading(true);
            Axios.put("http://localhost:3001/getCart" , {type : Location.state.type , id:Location.state.id}).then((response)=>{
                setHouse(response.data[0].address.house_no);
                setStreet(response.data[0].address.street);
                setArea(response.data[0].address.area);
                setCity(response.data[0].address.city);
                setState(response.data[0].address.state);
                Axios.put("http://localhost:3001/getSelectedProducts" , {id:response.data[0].on_cart}).then((response1) => {
                    setOnCart(response1.data);
                    Calculation(response1.data);
                })
        });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    } , [])

    return(
    <>
        {
            (Loading)?<div class="loader"></div>
            :
            <>

                <div className='container'>
                    <p className='confirmation-text'>Deliver To:</p><br></br>
                    <input type="text" className='general-input' defaultValue={House} onChange={(e)=>{setHouse(e.target.value);}}></input>
                    <input type="text" className='general-input' defaultValue={Street} onChange={(e)=>{setStreet(e.target.value);}}></input>
                    <input type="text" className='general-input' defaultValue={Area} onChange={(e)=>{setArea(e.target.value);}}></input>
                    <input type="text" className='general-input' defaultValue={City} onChange={(e)=>{setCity(e.target.value);}}></input>
                    <input type="text" className='general-input' defaultValue={State} onChange={(e)=>{setState(e.target.value);}}></input>
                </div>

                <div className='container bill-box'>
                    <b><p className='bill'>BILL</p></b>
                    <table className='w-100'>
                        <tr>
                            <th className='name-th'>PRODUCT NAME</th>
                            <th className='p-th'>ORIGINAL PRICE</th>
                            <th className='p-th'>SOLD PRICE</th>
                        </tr>
                        {OnCart.map((value)=>{
                            return(
                                <tr key={value.name}>
                                    <td className='p-td'>{value.name}</td>
                                    <td>Rs {value.oldprice}</td>
                                    <td>Rs {value.newprice}</td>
                                </tr>
                            );
                        })}
                        <tr><td><p> </p> </td></tr>
                        <tr>
                            <td></td>
                            <td><b className='discount'><p>DISCOUNT :</p></b></td>
                            <td><b><p>Rs 0</p></b></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td><b className='discount'><p>TOTAL :</p></b></td>
                            <td><b><p>Rs {Total}</p></b></td>
                        </tr>
                    </table>
                    <input type="radio" name='payment' onChange={()=>{setPaymentMode("COD")}} /><p className='check-box-text'>Pay on Delivery</p>
                    <input type="radio" name='payment' onChange={()=>{setPaymentMode("PN")}} /><p className='check-box-text'>Pay Now</p>
                    <div className='clear'></div>
                </div>

                <div>
                    <input type="checkbox" onChange={()=>{setAddressConfirmation(true)}} /><p className='check-box-text'>By checking this you confirm your delivery address given above.</p>
                    <br></br>
                    <input type="checkbox" onChange={()=>{setTCConfirmation(true)}} /><p className='check-box-text'>By checking this you agree to our all terms and conditions.</p>
                    <button className='final-button-cc' onClick={()=>{HandleClick()}}>PROCEED</button>
                </div>

            </>
        }
    </>
    );

}

export default Confirmation;