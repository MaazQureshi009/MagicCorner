import React from 'react';
import './confirmpage.css';
import { useNavigate  , useLocation} from 'react-router-dom'
import successimg from './success.png'

function Confirm(){

    const Navigate = useNavigate();
    const Location = useLocation();

    return(
        <>
        <div className='order-confirmed'>
            <b><h3 className='confirm-text'>Your order is confirmed successfully</h3></b>
            <img className='success-img' src={successimg} alt="success" />
            <h4>Thanks for your purchase.</h4>
            <p>You will receive an order confirmation details for your order.</p>
            <button className='go-back-btn'
                onClick={()=>{
                    (Location.state.type==="user")?
                    Navigate("/" , { state: {status: Location.state.status, name : Location.state.name , user:Location.state.user , type:Location.state.type , id:Location.state.id}})
                    :
                    Navigate("/Dashboard" , { state: {status: Location.state.status, name : Location.state.name , user:Location.state.user , type:Location.state.type , id:Location.state.id}})
                }} 
            >GO BACK</button>
            </div>
        </>
    )

}

export default Confirm;