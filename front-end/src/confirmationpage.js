import React from 'react';
import { useNavigate  , useLocation} from 'react-router-dom'

function Confirm(){

    const Navigate = useNavigate();
    const Location = useLocation();

    return(
        <>
            <p>ORDER CONFIRMED</p>
            <button
                onClick={()=>{
                    (Location.state.type==="user")?
                    Navigate("/" , { state: {status: Location.state.status, name : Location.state.name , user:Location.state.user , type:Location.state.type , id:Location.state.id}})
                    :
                    Navigate("/Dashboard" , { state: {status: Location.state.status, name : Location.state.name , user:Location.state.user , type:Location.state.type , id:Location.state.id}})
                }} 
            >GO BACK</button>
        </>
    )

}

export default Confirm;