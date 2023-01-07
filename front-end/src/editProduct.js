import { useState } from 'react';
import { useNavigate , useLocation } from 'react-router-dom';
import Axios from 'axios';

import './users.css';

function EditProducts(){

    const Navigate = useNavigate();
    const Location = useLocation();

    const [ Name , setName ] = useState(null);
    const [ Description , setDescription ] = useState(null);
    const [ MainCategory , setMainCategory ] = useState(null);
    const [ SubCategory , setSubCategory ] = useState(null);
    const [ NewPrice , setNewPrice ] = useState(0);
    const [ OldPrice , setOldPrice ] = useState(0);
    const [ State , setState ] = useState(null);

    //const fileref = ref(storage, "Files/");
    const Received = Location.state;

    const update = (id) => {
        console.log(id);
            Axios.post("http://localhost:3001/updateProducts" , 
            {
                id : id,
                name : Name,
                description : Description,
                newprice : NewPrice,
                oldprice : OldPrice,
                category : MainCategory ,
                tags : SubCategory,
                state : State,
            }).then((response) =>{alert("Product Updated");});
        };

    return(
        <div className='overall-log'>
            <p className='header'>Magic Corner</p>
            <div className=" main-container">
                <div className="container">
                    <button className="float-start general-button disabled-button" disabled>
                        EDIT PRODUCTS
                    </button>
                    <div className="container sub-container-1 float-start">
                        <div className="container row p-0">
                            <div className="col-12 float-start">
                                <p className="label-attributes">
                                    PRODUCT NAME:
                                </p>
                                <br></br>
                                <input type="text" placeholder="Eg: Window Curtain"
                                    className="input-attributes w-100"
                                    onChange={(event)=>{setName(event.target.value)}} 
                                    disabled
                                    defaultValue={Received.name} required>
                                </input>
                            </div>
                            <div className="col-12 float-start">
                                <p className="label-attributes">
                                    PRODUCT DESCRIPTION:
                                </p>
                                <br></br>
                                <input type="text" placeholder="Eg: Makes Your Window Beautiful" 
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
                            <div className="col-6">
                                <p className="label-attributes">
                                    CATEGORY:
                                </p>
                                <br></br>
                                <select className="input-attributes w-100" defaultValue={Received.category} onChange={(event)=>{setMainCategory(event.target.value)}} required>
                                    <option className="option-attributes">SELECT</option>
                                    <option className="option-attributes">NYLON</option>
                                    <option className="option-attributes">WOOLEN</option>
                                    <option className="option-attributes">LINEN</option>
                                </select>
                            </div>
                            <div className="col-6">
                                <p className="label-attributes">
                                    TAGS:
                                </p>
                                <br></br>
                                <select className="input-attributes w-100" defaultValue={Received.tags} onChange={(event)=>{setSubCategory(event.target.value)}} required>
                                    <option className="option-attributes">SELECT</option>
                                    <option className="option-attributes">CURTAIN</option>
                                    <option className="option-attributes">TABLE COVER</option>
                                </select>
                            </div>
                            <div className="col-12">
                                <p className="label-attributes">
                                    FEATURE IT ON HOME SCREEN:
                                </p>
                                <br></br>
                                <select className="input-attributes w-100" defaultValue={Received.status} onChange={(event)=>{setState(event.target.value)}} required>
                                    <option className="option-attributes">SELECT</option>
                                    <option className="option-attributes">ON</option>
                                    <option className="option-attributes">OFF</option>
                                </select>
                            </div>
                        </div>
                        <button className="final-button general-button" onClick={()=>{update(Received.id)}}>
                            <p className="final-label">
                                UPDATE
                                <i class="fi fi-br-rotate-right end-icons-err"></i>
                            </p>
                        </button>
                    </div>
                </div>
                <div className='clear'></div>
            </div>
        </div>
    );
};

export default EditProducts;