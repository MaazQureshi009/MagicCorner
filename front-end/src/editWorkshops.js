import { useState } from 'react';
import { useNavigate , useLocation } from 'react-router-dom';
import Axios from 'axios';

import './users.css';

function Products(){

    const Navigate = useNavigate();
    const Location = useLocation();

    const [ Name , setName ] = useState(null);
    const [ Description , setDescription ] = useState(null);
    const [ NewPrice , setNewPrice ] = useState(0);
    const [ OldPrice , setOldPrice ] = useState(0);

    //const fileref = ref(storage, "Files/");
    const Received = Location.state;

    const update = (id) => {
            Axios.post("http://localhost:3001/UpdateWorkshops" , 
            {
                id : id,
                name : Name,
                description : Description,
                newprice : NewPrice,
                oldprice : OldPrice,
            });
            alert("Workshop Added");
            Navigate("/");
        };

    return(
        <div className='overall-log'>
            <p className='header'>Magic Corner</p>
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
                            <p className="final-label">
                                ADD
                                <i className="fi fi-br-angle-right end-icons-err"></i>
                            </p>
                        </button>
                    </div>
                </div>
                <div className='clear'></div>
            </div>
        </div>
    );
};

export default Products;