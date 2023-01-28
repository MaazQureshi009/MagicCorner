import { useState , useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Axios from 'axios';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import PaymentForm from "./WorkshopPayment"

import './CheckoutConfirmation.css';

const stripeTestPromise = loadStripe("pk_test_51MUVB7SGIELCYthBUvl2BAFMhq5x8tZkYaRowWH4DhV2WcS88CfIcPpQ2oKvQ1gS4c6hnrXPhXWyDW2RggOwd87T00Um8DcX51");

function Confirmation(){
    const Location = useLocation();

    console.log(Location.state);
    const [ Id , setId ] = useState(null)
    const [ Name , setName ] = useState(null)
    const [ Mobile , setMobile ] = useState(null)
    const [ Email , setEmail ] = useState(null)
    const [ OnCart , setOnCart ] = useState([])
    const [ AddressConfirmation , setAddressConfirmation ] = useState(false);
    const [ TCConfirmation , setTCConfirmation ] = useState(false);
    const [ PaymentMode , setPaymentMode ] = useState(null)
    const [ Loading , setLoading ] = useState(false)
    const [ PayNow , setPayNow ] = useState(false)
    const [ Total , setTotal ] = useState(null)
    const [ WN , setWN ] = useState(null)

    const HandleClick = () => {
        if(AddressConfirmation === false){
            alert("Agree our Conditions");
        }
        if(TCConfirmation === false){
            alert("Verify your address");
        }
        if(PaymentMode === "PN"){
            setPayNow(true);
        }
        else{
            alert("Select Payment Mode");
        }
    }

    useEffect(()=>{
            setLoading(true);
            console.log(Location.state);
            Axios.put("http://localhost:3001/getCart" , {type : Location.state.type , id:Location.state.id}).then((response)=>{
                setName(response.data[0].full_name);
                setMobile(response.data[0].mobile_no);
                setEmail(response.data[0].email);
                setId(response.data[0]._id);
                Axios.put("http://localhost:3001/getSelectedWorkShops" , {id:Location.state.Product_id}).then((response1) => {
                    setOnCart(response1.data);
                    setTotal(response1.data[0].newprice);
                    setWN(response1.data[0].name);
                    setLoading(false);
                })
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    } , [])

    return(
    <>
        {
            (Loading)?
            <div className='loader-main'>
                <div className="loader"></div>
                <p className='loader-text'>Confirming Order</p>
            </div>
            :
            <>

                <div className='container'>
                    <p className='confirmation-text'>Deliver To:</p><br></br>
                    <input type="text" className='general-input' defaultValue={Name} onChange={(e)=>{setName(e.target.value);}}></input>
                    <input type="text" className='general-input' defaultValue={Email} onChange={(e)=>{setEmail(e.target.value);}}></input>
                    <input type="text" className='general-input' defaultValue={Mobile} onChange={(e)=>{setMobile(e.target.value);}}></input>
                </div>

                <div className='container bill-box'>
                    <b><p className='bill'>BILL</p></b>
                    <table className='w-100'>
                        <tr>
                            <th className='name-th'>WORKSHOP NAME</th>
                            <th className='p-th'>ORIGINAL PRICE</th>
                            <th className='p-th'>ENROLLED PRICE</th>
                        </tr>
                        {OnCart.map((value)=>{
                            return(
                                <>
                                    <tr key={value.name}>
                                        <td className='p-td'>
                                        {value.name}
                                        </td>
                                        <td>Rs {value.oldprice}</td>
                                        <td>Rs {value.newprice}</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td><b className='discount'><p>TOTAL :</p></b></td>
                                        <td><b><p>Rs {value.newprice}</p></b></td>
                                    </tr>
                                </>
                            );
                        })}
                        <tr><td><p> </p> </td></tr>
                    </table>
                    <input type="radio" className='radio' name='payment' onChange={()=>{setPaymentMode("PN");}} /><p className='check-box-text'>Pay Now</p>
                    <div className='clear'></div>
                </div>

                <div>
                    <input type="checkbox" onChange={()=>{setAddressConfirmation(true)}} /><p className='check-box-text'>By checking this you confirm your delivery address given above.</p>
                    <br></br>
                    <input type="checkbox" onChange={()=>{setTCConfirmation(true)}} /><p className='check-box-text'>By checking this you agree to our all terms and conditions.</p>
                    {
                        (PayNow)?
                        <Elements stripe={stripeTestPromise}>
                            <PaymentForm state={{ status : Location.state.status , type : Location.state.type , wn : WN , id : Id , name : Name , mobile : Mobile , email : Email , total : Total }} />
                        </Elements>
                        :
                        <>
                            <button className='final-button-cc' onClick={()=>{HandleClick()}}>PROCEED</button>
                        </>
                    }
                </div>

                <hr className="full-width-line" />
                <div className="notice tile-about">
                    <div className="owner" data-block="owner">
                        <div className='information'>
                                <h2>FAQ's</h2>
                            <div className="author">
                                    {/* -. */}
                            </div>
                            <div className="description">
                                <p></p><p><b><u>Disclaimer</u>&nbsp;</b>Our beautiful products are 100% hand made with love, so as a result of human manual involvement there might be slight irregularities in color, size and knots than portrayed in pictures. These irregularities are the hallmark of hand made product and make each exquisite piece one-of-its-kind.</p><p></p><p><b><u>IMPORTANT</u></b></p><p><b>1. </b><b>Spools below 50meter will be handmade. For machine made spools buy above 50meter.</b></p><p><b>2.Please make a video while opening your package to claim any damage or missing article.</b></p><p><b>3. Cancellation after booking an order will cost you Razorpay fee. </b><b>Remaining </b><b>balance</b><b> will be refunded.</b></p><p></p><p></p><p><u><b>SHIPPING</b></u></p><p>We now ship worldwide!!!</p><p>Macramé is a handmade product which is made to order. Please coordinate with us after placing the order. (For your estimate delivery date)</p><p>Kindly allow 5-20 days(as per product kind) for dispatch.&nbsp;</p><p>Bulk or custom orders might take longer to dispatch.&nbsp;</p><p>However, shipping time is completely dependent on the shipping vendor and your locations.</p><p></p><p></p><p><u><b>RETURN</b></u></p><p>We want you to be happy with your order from us. However, since we are a small business, we are unable to offer refunds if you change your mind about an order. We will happily replace any defective or broken product. Please contact us within 48 hours via Instagram with supporting pictures as a proof of damage. After 48 hours return of the damaged product will not be liable. After the approval of images the product need to be sent by the customer itself within 7 days. WE WILL NOT COVER RETURN SHIPPING FROM THECUSTOMER'S END. We will then send a fresh piece of same defective product within the time limit mentioned above. Please take care when mailing any items back to us. We cannot be responsible for any further damage which occurs during transit.</p><p></p><p></p><p></p><p></p><p><u><b>DURABILITY</b></u></p><p>For better durability and color don’t hang in sunlight. As these are dyed ropes so there is No Guarantee of color longevity.</p><p></p><p><u><b>CITY OF ORIGIN</b></u> – India</p><p></p>
                            </div>
                            <div className="cb"></div>
                        </div>
                    </div>
                </div>
            </>
        }
    </>
    );

}

export default Confirmation;