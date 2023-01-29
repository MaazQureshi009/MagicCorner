import Axios from 'axios';
import { useNavigate , useLocation } from 'react-router-dom';
import { useEffect , useState } from 'react';

function Upload_User(){

    const [ Captchaa , setCaptchaa ] = useState("");
    const [ OOTP , setOOTP ] = useState("");
    const [ Loading , setLoading ] = useState(false);

    const  Navigate = useNavigate();
    const Location = useLocation();

    useEffect(
        ()=>{
            console.log("Running");
            Axios.put("http://localhost:3001/OtpMailer" , {
                type : Location.state.type,
                otp : Location.state.otp,
                email : Location.state.email,
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
        } , []
    );

    const check = () => {
        setLoading(true);
        if(Captchaa.toString() === Location.state.captcha.toString()){
            if(OOTP.toString() === Location.state.otp.toString()){
                Axios.put("http://localhost:3001/PasswordMailer" , {type : Location.state.type,email : Location.state.email}).then(()=> {
                    setLoading(false)
                    Navigate("/Login");
                })
            }
            else{
                alert("OTP Miss Match");
            }
        }
        else{
            alert("Captcha Miss Match");
        }
    };

    return(
        <>
            {
                (Loading)?
                <div className='loader-main'>
                    <div className="loader"></div>
                    <p className='loader-text'>Sending Your Password...</p>
                </div>
                :
                <div className="overall-log" id="Home">
                    <div className="main-container">
                        <div className="container">
                            <button className="float-start general-button disabled-button" disabled>
                                VERIFICATION
                                <i className="fi fi-ss-user end-icons" ></i>
                            </button>
                            <div className="container sub-container-1 float-start">
                                <form>
                                    <p className="label-log-attributes">
                                        CAPTCHA: <s>{Location.state.captcha}</s>
                                    </p>
                                    <br></br>
                                    <input type="text" placeholder="CAPTCHA" 
                                        className="input-log-attributes w-100"
                                        onChange={(event)=>{setCaptchaa(event.target.value)}}>
                                    </input>
                                    <br></br>
                                    <p className="label-log-attributes">
                                        OTP:
                                    </p>
                                    <br></br>
                                    <input type="text" placeholder="OTP" 
                                        className="input-log-attributes w-100"
                                        onChange={(event)=>{setOOTP(event.target.value)}}>
                                    </input>
                                    <button className="final-button general-button"
                                        onClick={check} type="button">
                                        <p className="final-label">
                                        VERIFY
                                        <i className="fi fi-br-angle-right end-icons-err"></i>
                                        </p>
                                    </button>
                                </form>
                            </div>
                        </div>
                        <div className="clear"></div>
                    </div>
                    <div className="clear"></div>
                </div>
            }
        </>
    );
}

export default Upload_User;