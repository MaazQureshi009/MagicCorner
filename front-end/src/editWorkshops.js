import { useState } from 'react';
import { useNavigate , useLocation } from 'react-router-dom';
import Axios from 'axios';

import './users.css';

function EditWorkshops(){

    const Navigate = useNavigate();
    const Location = useLocation();

    const [ Name , setName ] = useState(null);
    const [ Description , setDescription ] = useState(null);
    const [ NewPrice , setNewPrice ] = useState(0);
    const [ OldPrice , setOldPrice ] = useState(0);
    const [ Loading , setLoading ] = useState(false);

    //const fileref = ref(storage, "Files/");
    const Received = Location.state;

    const update = (id) => {
        setLoading(true);
        Axios.put("http://localhost:3001/UpdateWorkshops" , 
        {
            id : id,
            name : Name,
            description : Description,
            newprice : NewPrice,
            oldprice : OldPrice,
        }).then(() =>{
            setLoading(false);
            Navigate("/displayWorkshops" , {state:{check: "in" , status: Location.state.user_status, name : Location.state.user_name , user:Location.state.user , type:Location.state.type , id:Location.state.user_id}});
        });
    };

    return(
        <>
        {
        (Loading)?
        <>
            <div className='loader-main'>
                <div className="loader"></div>
                <p className='loader-text'>Saving Changes...</p>
            </div>
        </>
        :
        <div className='overall-log'>
            <div className=" main-container">
                <div className="container">
                    <button className="float-start general-button disabled-button" disabled>
                        EDIT WORKSHOPS
                    </button>
                    <div className="container sub-container-1 float-start">
                        <div className="container row p-0">
                            <div className="col-12 float-start">
                                <p className="label-attributes">
                                    WORKSHOP NAME:
                                </p>
                                <br></br>
                                <input type="text" placeholder="Eg: Tailoring Classes" 
                                    className="input-attributes w-100"
                                    defaultValue={Received.name} disabled
                                    onChange={(event)=>{setName(event.target.value)}} required>
                                </input>
                            </div>
                            <div className="col-12 float-start">
                                <p className="label-attributes">
                                    WORKSHOP DESCRIPTION:
                                </p>
                                <br></br>
                                <input type="text" placeholder="Eg: Get trained to bring your dream clothes live!!" 
                                    className="input-attributes w-100"
                                    defaultValue={Received.description}
                                    onChange={(event)=>{setDescription(event.target.value)}} required>
                                </input>
                            </div>
                            <div className="col-12 float-start">
                                <p className="label-attributes">
                                    NEW PRICE:
                                </p>
                                <br></br>
                                <input type="text" placeholder="Eg: 499" 
                                    className="input-attributes w-100"
                                    defaultValue={Received.newprice}
                                    onChange={(event)=>{setNewPrice(event.target.value)}} required>
                                </input>
                            </div>
                            <div className="col-12 float-start">
                                <p className="label-attributes">
                                    OLD PRICE:
                                </p>
                                <br></br>
                                <input type="text" placeholder="Eg: 999" 
                                    className="input-attributes w-100"
                                    defaultValue={Received.oldprice}
                                    onChange={(event)=>{setOldPrice(event.target.value)}} required>
                                </input>
                            </div>
                        </div>
                        <button className="final-button general-button" onClick={() => {update(Received.id)}}>
                                UPDATE
                                <i className="fi fi-br-angle-right end-icons-err"></i>
                        </button>
                    </div>
                </div>
                <div className='clear'></div>
            </div>
        </div>
        }
        </>
    );
};

export default EditWorkshops;