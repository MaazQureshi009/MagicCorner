import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { ref , uploadBytes , getDownloadURL } from 'firebase/storage';
import { storage } from './cloud'

import './users.css';

function Products(){

    const Navigate = useNavigate();

    const [ Name , setName ] = useState(null);
    const [ Description , setDescription ] = useState(null);
    const [ MainCategory , setMainCategory ] = useState(null);
    const [ SubCategory , setSubCategory ] = useState(null);
    const [ NewPrice , setNewPrice ] = useState(0);
    const [ OldPrice , setOldPrice ] = useState(0);
    const [ State , setState ] = useState(null);
    const [ File , setFile ] = useState(null);

    //const fileref = ref(storage, "Files/");

    const upload = () => {
            if (File == null) return;
            const FileReference = ref(storage , `Product_DP/${File.name+Name}`);
            uploadBytes(FileReference , File).then((FileData) => {
                getDownloadURL(FileData.ref).then((url) => {
                    Axios.post("http://localhost:3001/addProduct" , 
                    {
                        image_url : url,
                        name : Name,
                        description : Description,
                        newprice : NewPrice,
                        oldprice : OldPrice,
                        category : MainCategory ,
                        tags : SubCategory,
                        state : State,
                    });
                });
            });
            alert("Product Added");
            Navigate("/");
        };

    return(
        <div className='overall'>
            <p className='header'>Magic Corner</p>
            <div className=" main-container">
                <div className="container">
                    <button className="float-start general-button active-button" 
                        onClick={()=>{Navigate("/addWorkshops");}}>
                        ADD WORKSHOPS
                    </button>
                    <button className="float-end general-button disabled-button" disabled>
                        ADD PRODUCTS
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
                                    onChange={(event)=>{setName(event.target.value)}} required>
                                </input>
                            </div>
                            <div className="col-12 float-start">
                                <p className="label-attributes">
                                    PRODUCT DESCRIPTION:
                                </p>
                                <br></br>
                                <input type="text" placeholder="Eg: Makes Your Window Beautiful" 
                                    className="input-attributes w-100"
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
                                    onChange={(event)=>{setOldPrice(event.target.value)}} required>
                                </input>
                            </div>
                            <div className="col-6">
                                <p className="label-attributes">
                                    CATEGORY:
                                </p>
                                <br></br>
                                <select className="input-attributes w-100" onChange={(event)=>{setMainCategory(event.target.value)}} required>
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
                                <select className="input-attributes w-100" onChange={(event)=>{setSubCategory(event.target.value)}} required>
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
                                <select className="input-attributes w-100" onChange={(event)=>{setState(event.target.value)}} required>
                                    <option className="option-attributes">SELECT</option>
                                    <option className="option-attributes">ON</option>
                                    <option className="option-attributes">OFF</option>
                                </select>
                            </div>
                            <div className="col-12">
                                <p className="label-attributes">
                                    PRODUCT IMAGES:
                                </p>
                                <br></br>
                                <input type="file" accept='image/*' 
                                    className="input-attributes w-100"
                                    onChange={(event)=>{setFile(event.target.files[0])}} required>
                                </input>
                            </div>
                        </div>
                        <button className="final-button general-button" onClick={upload}>
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