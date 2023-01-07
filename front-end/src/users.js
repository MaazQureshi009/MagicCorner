import { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

import './users.css';

function Products()
{

    const Navigate = useNavigate();

    let Captcha=0
    let OTP = 0

    const generator = () =>{
        Captcha = Math.floor((Math.random()*9999)+1000);
        OTP = Math.floor((Math.random()*9999)+1000);

        console.log(Captcha,OTP);
    }

    const [ Name , setName ] = useState(null);
    const [ Email , setEmail ] = useState(null);
    const [ Mobile , setMobile ] = useState(0);
    const [ Gender , setGender ] = useState(null);
    const [ Age , setAge ] = useState(0);
    const [ DOB , setDOB ] = useState(null);
    const [ House , setHouse ] = useState(null);
    const [ Street , setStreet ] = useState(null);
    const [ Area , setArea ] = useState(null);
    const [ City , setCity ] = useState(null);
    const [ State , setState ] = useState(null);
    const [ PinCode , setPinCode ] = useState(null);
    const [ Password , setPassword ] = useState(null); 
    const [File , setFile ] = useState(null);
    const [ Decision , setDecision ] = useState(null);
    const [ ExistingUsers , setExistingUsers ] = useState([]);
    const [ ExistingAdmins , setExistingAdmins ] = useState([]);

    useEffect(
        () =>{
            Axios.get("http://localhost:3001/allUsers").then(
                (response) => {
                    setExistingUsers(response.data);
                }
            );
            Axios.get("http://localhost:3001/allAdmins").then(
                (response) => {
                    setExistingAdmins(response.data);
                }
            );
        } , []
    );

    //const fileref = ref(storage, "Files/");

    const Decide = ()=>{

        if(Decision === null){
            if(ExistingUsers.length === 0){
                if(ExistingAdmins.length === 0){
                    generator();
                    Navigate('/userVerification' , 
                        {   
                            state:{name:Name , email:Email , mobile:Mobile , 
                            gender:Gender , age:Age , dob:DOB , house:House , 
                            street:Street , area:Area , city:City , status:State ,
                            pincode:PinCode , file:File , password:Password ,
                            captcha:Captcha , otp:OTP}
                        }
                    );
                }
                else{
                    for(var i =0 ; i < ExistingAdmins.length ; i++){
                        if(Email.toString() === ExistingAdmins[i].email.toString()){
                            alert("Admin Exist");
                            Navigate('/Login');
                            break;
                        }
                        else{
                            generator();
                            Navigate('/userVerification' , 
                                {   
                                    state:{name:Name , email:Email , mobile:Mobile , 
                                    gender:Gender , age:Age , dob:DOB , house:House , 
                                    street:Street , area:Area , city:City , status:State ,
                                    pincode:PinCode , file:File , password:Password ,
                                    captcha:Captcha , otp:OTP}
                                }
                            );
                        }
                    }
                }
            }
            else{
                if(ExistingAdmins.length === 0){
                    for(var j =0 ; j < ExistingUsers.length ; j++){
                        if(Email.toString() === ExistingUsers[j].email.toString()){
                            alert("User Exist");
                            Navigate('/Login');
                            break;
                        }
                        else{
                            if( j === ExistingUsers.length - 1){
                                generator();
                                Navigate('/userVerification' ,
                                    {   
                                        state:{name:Name , email:Email , mobile:Mobile , 
                                        gender:Gender , age:Age , dob:DOB , house:House , 
                                        street:Street , area:Area , city:City , status:State ,
                                        pincode:PinCode , file:File , password:Password ,
                                        captcha:Captcha , otp:OTP}
                                    } 
                                );
                            }
                        }
                    }
                }
                else{
                    for(i =0 ; i < ExistingAdmins.length ; i++){
                        if(Email.toString() === ExistingAdmins[i].email.toString()){
                            alert("Admin Exist");
                            Navigate('/Login');
                            break;
                        }
                        else{
                            if( i === ExistingAdmins.length - 1){
                                for( j =0 ; j < ExistingUsers.length ; j++){
                                    if(Email.toString() === ExistingUsers[j].email.toString()){
                                        alert("User Exist");
                                        Navigate('/Login');
                                        break;
                                    }
                                    else{
                                        if( j === ExistingUsers.length - 1){
                                            generator();
                                            Navigate('/userVerification' ,
                                                {   
                                                    state:{name:Name , email:Email , mobile:Mobile , 
                                                    gender:Gender , age:Age , dob:DOB , house:House , 
                                                    street:Street , area:Area , city:City , status:State ,
                                                    pincode:PinCode , file:File , password:Password ,
                                                    captcha:Captcha , otp:OTP}
                                                } 
                                            );
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        else{
            if(ExistingAdmins.length === 0){
                if(ExistingUsers.length === 0){
                    generator();
                    Navigate('/adminVerification' , 
                        {   
                            state:{name:Name , email:Email , mobile:Mobile , 
                            gender:Gender , age:Age , dob:DOB , house:House , 
                            street:Street , area:Area , city:City , status:State ,
                            pincode:PinCode , file:File , password:Password ,
                            captcha:Captcha , otp:OTP}
                        }
                    );
                }
                else{
                    for(var l =0 ; l < ExistingUsers.length ; l++){
                        console.log(ExistingUsers[l]);
                            if(Email.toString() === ExistingUsers[l].email.toString()){
                                Axios.post("http://localhost:3001/DeleteUser" , {email:Email});
                                generator();
                                Navigate('/adminVerification' , 
                                    {   
                                        state:{name:Name , email:Email , mobile:Mobile , 
                                        gender:Gender , age:Age , dob:DOB , house:House , 
                                        street:Street , area:Area , city:City , status:State ,
                                        pincode:PinCode , file:File , password:Password ,
                                        captcha:Captcha , otp:OTP}
                                    }
                                );
                                break;
                            }
                            else{
                                if( l === ExistingUsers.length - 1){
                                    generator();
                                    Navigate('/adminVerification' , 
                                        {   
                                            state:{name:Name , email:Email , mobile:Mobile , 
                                            gender:Gender , age:Age , dob:DOB , house:House , 
                                            street:Street , area:Area , city:City , status:State ,
                                            pincode:PinCode , file:File , password:Password ,
                                            captcha:Captcha , otp:OTP}
                                        }
                                    );
                                }
                            }
                    }
                }
            }
            else{
                if(ExistingUsers.length === 0){
                    for(var k =0 ; k < ExistingAdmins.length ; k++){
                        if(Email.toString() === ExistingAdmins[k].email.toString()){
                            alert("Admin Exist");
                            Navigate('/Login');
                            break;
                        }
                        else{
                            generator();
                            Navigate('/adminVerification' , 
                                {   
                                    state:{name:Name , email:Email , mobile:Mobile , 
                                    gender:Gender , age:Age , dob:DOB , house:House , 
                                    street:Street , area:Area , city:City , status:State ,
                                    pincode:PinCode , file:File , password:Password ,
                                    captcha:Captcha , otp:OTP}
                                }
                            );
                        }
                    }
                }
                else{
                    for( k =0 ; k < ExistingAdmins.length ; k++){
                        if(Email.toString() === ExistingAdmins[k].email.toString()){
                            alert("Admin Exist");
                            Navigate('/Login');
                            break;
                        }
                        else{
                            if( k === ExistingAdmins.length - 1){
                                for( l =0 ; l < ExistingUsers.length ; l++){
                                    if(Email.toString() === ExistingUsers[l].email.toString()){
                                        Axios.post("http://localhost:3001/DeleteUser" , {email:Email});
                                        generator();
                                        Navigate('/adminVerification' , 
                                            {   
                                                state:{name:Name , email:Email , mobile:Mobile , 
                                                gender:Gender , age:Age , dob:DOB , house:House , 
                                                street:Street , area:Area , city:City , status:State ,
                                                pincode:PinCode , file:File , password:Password ,
                                                captcha:Captcha , otp:OTP}
                                            }
                                        );
                                        break;
                                    }
                                    else{
                                        if( l === ExistingUsers.length - 1){
                                            generator();
                                            Navigate('/adminVerification' , 
                                                {   
                                                    state:{name:Name , email:Email , mobile:Mobile , 
                                                    gender:Gender , age:Age , dob:DOB , house:House , 
                                                    street:Street , area:Area , city:City , status:State ,
                                                    pincode:PinCode , file:File , password:Password ,
                                                    captcha:Captcha , otp:OTP}
                                                }
                                            );
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return(
        <div className='overall'>
            <p className="header">Magic Corner</p>
            <div className=" main-container">
                <div className="container">
                    <button className="float-start general-button active-button" 
                        onClick={()=>{Navigate("/Login");}}>
                        LOGIN
                        <i className="fi fi-ss-user end-icons" ></i>
                    </button>
                    <button className="float-end general-button disabled-button" disabled>
                        REGISTER
                        <i className="fi fi-ss-user-add end-icons"></i>
                    </button>
                    <div className="container sub-container-1 float-start">
                        <div className="container row p-0">
                            <div className="col-12 float-start">
                                <p className="label-attributes">
                                    FULL NAME:
                                </p>
                                <br></br>
                                <input type="text" placeholder="Eg: Walter White" 
                                    className="input-attributes w-100"
                                    onChange={(event)=>{setName(event.target.value)}} required>
                                </input>
                            </div>
                            <div className="col-4">
                                <p className="label-attributes">
                                    GENDER:
                                </p>
                                <br></br>
                                <select className="input-attributes w-100" onChange={(event)=>{setGender(event.target.value)}} required>
                                    <option className="option-attributes">SELECT</option>
                                    <option className="option-attributes">MALE</option>
                                    <option className="option-attributes">FEMALE</option>
                                    <option className="option-attributes">OTHERS</option>
                                    <option className="option-attributes">NOT PREFER TO TELL</option>
                                </select>
                            </div>
                            <div className="col-4">
                                <p className="label-attributes">
                                    AGE:
                                </p>
                                <br></br>
                                <input type="number" min="3" max="100" defaultValue="3" className="input-attributes w-100" 
                                    onChange={(event)=>{setAge(event.target.value)}} required>
                                </input>
                            </div>
                            <div className="col-4">
                                <p className="label-attributes">
                                    DOB:
                                </p>
                                <br></br>
                                <input type="date" className="input-attributes w-100" onChange={(event)=>{setDOB(event.target.value)}} required>
                                </input>
                            </div>
                            <div className="col-6 float-start">
                                <p className="label-attributes">
                                    E-MAIL:
                                </p>
                                <br></br>
                                <input type="email" className="input-attributes w-100" placeholder="Eg: Walterwhite1965@gmail.com" 
                                    onChange={(event)=>{setEmail(event.target.value)}} required>
                                </input>
                            </div>
                            <div className="col-6 float-end">
                                <p className="label-attributes">
                                    MOBILE NO:
                                </p>
                                <br></br>
                                <input type="tel" pattern="[0-9]{10}" placeholder="Eg: 9582xxxxxx" 
                                    className="input-attributes w-100"
                                    onChange={(event)=>{setMobile(event.target.value)}} required>
                                </input>
                            </div>
                            <div className="col-4 float-end">
                            <p className="label-attributes">
                                HOUSE NO:
                            </p>
                            <br></br>
                            <input type="text" className="input-attributes w-100" placeholder="Eg: 37/516" 
                                onChange={(event)=>{setHouse(event.target.value)}} required>
                            </input>
                        </div>
                        <div className="col-4 float-end">
                            <p className="label-attributes">
                                STREET:
                            </p>
                            <br></br>
                            <input type="text" className="input-attributes w-100" placeholder="Eg: 32" 
                                onChange={(event)=>{setStreet(event.target.value)}} required>
                            </input>
                        </div>
                        <div className="col-4 float-end">
                            <p className="label-attributes">
                                AREA:
                            </p>
                            <br></br>
                            <input type="text" className="input-attributes w-100" placeholder="Eg: Gandhi Nagar" 
                                onChange={(event)=>{setArea(event.target.value)}} required>
                            </input>
                        </div>
                        <div className="col-4 float-end">
                            <p className="label-attributes">
                                CITY:
                            </p>
                            <br></br>
                            <input type="text" className="input-attributes w-100" placeholder="Eg: Bangalore" 
                                onChange={(event)=>{setCity(event.target.value)}} required>
                            </input>
                        </div>
                        <div className="col-4 float-end">
                            <p className="label-attributes">
                                STATE:
                            </p>
                            <br></br>
                            <input type="text" className="input-attributes w-100" placeholder="Eg: Karnataka" 
                                onChange={(event)=>{setState(event.target.value)}} required>
                            </input>
                        </div>
                        <div className="col-4 float-end">
                            <p className="label-attributes">
                                PINCODE:
                            </p>
                            <br></br>
                            <input type="text" className="input-attributes w-100" placeholder="Eg: 635109" 
                                onChange={(event)=>{setPinCode(event.target.value)}} required>
                            </input>
                        </div>
                        <div className="col-12 float-end">
                            <p className="label-attributes">
                                PROFILE PICTURE:
                            </p>
                            <br></br>
                            <input type="file" accept='image/*' className="input-attributes w-100" placeholder="Eg: 32" 
                                onChange={(event)=>{setFile(event.target.files[0])}} required>
                            </input>
                        </div>
                            <div className="col-12">
                                <p className="label-attributes">
                                    PASSWORD:
                                </p>
                                <br></br>
                                <input type="password" placeholder="Eg: P@ssw0rd" 
                                    className="input-attributes w-100"
                                    onChange={(event)=>{setPassword(event.target.value)}} required>
                                </input>
                            </div>
                        </div>
                        <div>
                            <div className='col-12'>
                                <input type='checkbox' value="Admin" 
                                    onChange={(e) =>{ setDecision(e.target.value) }} 
                                />
                                <p className="admin-label-attributes" >
                                    VERIFY AS ADMIN ( OTP will be verified with Admin MailID )
                                </p>
                            </div>
                        </div>
                        <button className="final-button general-button" onClick={Decide}>
                            <p className="final-label">
                                REGISTER
                                <i className="fi fi-br-angle-right end-icons-err"></i>
                            </p>
                        </button>
                    </div>
                </div>
                <div className="clear"></div>
            </div>
            <div className="clear"></div>
        </div>
    );
};

export default Products;

/*
<div className="col-4 float-end">
                            <p className="label-attributes">
                                HOUSE NO:
                            </p>
                            <br></br>
                            <input type="text" className="input-attributes w-100" placeholder="Eg: 37/516" 
                                onChange={(event)=>{setHouse(event.target.value)}} required>
                            </input>
                        </div>
                        <div className="col-4 float-end">
                            <p className="label-attributes">
                                STREET NO:
                            </p>
                            <br></br>
                            <input type="text" className="input-attributes w-100" placeholder="Eg: 32" 
                                onChange={(event)=>{setStreet(event.target.value)}} required>
                            </input>
                        </div>
                        <div className="col-4 float-end">
                            <p className="label-attributes">
                                AREA:
                            </p>
                            <br></br>
                            <input type="text" className="input-attributes w-100" placeholder="Eg: Gandhi Nagar" 
                                onChange={(event)=>{setArea(event.target.value)}} required>
                            </input>
                        </div>
                        <div className="col-4 float-end">
                            <p className="label-attributes">
                                CITY:
                            </p>
                            <br></br>
                            <input type="text" className="input-attributes w-100" placeholder="Eg: Bangalore" 
                                onChange={(event)=>{setCity(event.target.value)}} required>
                            </input>
                        </div>
                        <div className="col-4 float-end">
                            <p className="label-attributes">
                                STATE:
                            </p>
                            <br></br>
                            <input type="text" className="input-attributes w-100" placeholder="Eg: Karnataka" 
                                onChange={(event)=>{setState(event.target.value)}} required>
                            </input>
                        </div>
                        <div className="col-4 float-end">
                            <p className="label-attributes">
                                PINCODE:
                            </p>
                            <br></br>
                            <input type="text" className="input-attributes w-100" placeholder="Eg: 635109" 
                                onChange={(event)=>{setPinCode(event.target.value)}} required>
                            </input>
                        </div>
                        <div className="col-12 float-end">
                            <p className="label-attributes">
                                PROFILE PICTURE:
                            </p>
                            <br></br>
                            <input type="file" accept='image/*' className="input-attributes w-100" placeholder="Eg: 32" 
                                onChange={(event)=>{setFile(event.target.files[0])}} required>
                            </input>
                        </div>
*/