import { useState , useEffect } from "react";
import { useNavigate , Link } from "react-router-dom";
import Axios from 'axios';
import './users.css';

function RetrivePassword(){
    const [ Username , setUsername ] = useState (null );
    const Navigate = useNavigate();

    let Captcha=0
    let OTP = 0

    const generator = () =>{
        Captcha = Math.floor((Math.random()*9999)+1000);
        OTP = Math.floor((Math.random()*9999)+1000);

        console.log(Captcha,OTP);
    }

    useEffect(
        () =>{
            Axios.get("http://localhost:3001/allUsers").then((response) => {
                setUsers_list(response.data);
            });
            Axios.get("http://localhost:3001/allAdmins").then((response) => {
                setAdmins_list(response.data);
            });
        } , []
    );

    const [ Users_list , setUsers_list ] = useState([]);
    const [ Admins_list , setAdmins_list ] = useState([]);

    const validate = () => {
        if(Admins_list.length === 0){
            if(Users_list.length === 0){
                alert("Invalid Username!!");
            }
            if(Users_list.length !== 0){
                for(var j = 0 ; j <= Users_list.length ; j++){
                    if( Users_list[j].email.toString() === Username.toString() ){
                        generator()
                        Navigate("/SendPassword" , {state:{type : "user" , captcha:Captcha , otp:OTP , email : Username}});
                        break;
                    }
                    else if( j === Users_list.length-1 ){alert("Invalid Username!!");}
                }
            }
        }
        else{
            for(var i = 0; i < Admins_list.length ; i++){
                if( Admins_list[i].email.toString() === Username.toString() ){
                    generator();
                    Navigate("/SendPassword" , {state:{type : "admin" , captcha:Captcha , otp:OTP , email : Username}});
                    break;
                }
                else if(i === Admins_list.length-1 && Users_list.length === 0){
                    alert("Invalid Username!!");
                }
                else if( i === Admins_list.length-1 ){
                    for( j = 0 ; j <= Users_list.length ; j++){
                        if( Users_list[j].email.toString() === Username.toString() ){
                            generator();
                            Navigate("/SendPassword" , {state:{type : "user" , captcha:Captcha , otp:OTP , email : Username}});
                            break;
                        }
                        else if( j === Users_list.length-1 ){alert("Invalid Username!!");}
                    }
                }
            }
        }
    };
        
    const check = () => {
        validate();

    };

    return(
        <div className="overall-log" id="Home">
            <div className="main-container">
                <div className="container">
                    <button className="float-start general-button disabled-button" disabled>
                        LOGIN
                        <i className="fi fi-ss-user end-icons" ></i>
                    </button>
                    <button className="float-end general-button active-button" 
                        onClick={()=>{Navigate("/users");}}>
                        REGISTER
                        <i className="fi fi-ss-user-add end-icons"></i>
                    </button>
                    <div className="container sub-container-1 float-start">
                        <form>
                            <p className="label-log-attributes">
                                USERNAME:
                            </p>
                            <br></br>
                            <input type="text" placeholder="Email......" 
                                className="input-log-attributes w-100"
                                onChange={(event)=>{setUsername(event.target.value)}}>
                            </input>
                            <button className="final-button general-button"
                                onClick={check} type="button">
                                <p className="final-label">
                                VERIFY
                                <i className="fi fi-br-angle-right end-icons-err"></i>
                                </p>
                            </button>
                            <Link to="/users" className='forgot-password'>Forgot Password ?</Link>
                        </form>
                    </div>
                </div>
                <div className="clear"></div>
            </div>
            <div className="clear"></div>
        </div>
    );
}

export default RetrivePassword;