import { useState , useEffect } from 'react';
import { useNavigate , useLocation } from 'react-router-dom';
import Axios from 'axios';
import { ref , uploadBytes , getDownloadURL } from 'firebase/storage';
import { storage } from './cloud'

import './users.css';

function Products(){

    const Navigate = useNavigate();
    const Location = useLocation();

    const [ Loading , setLoading ] = useState(false);
    const [ Name , setName ] = useState(null);
    const [ Description , setDescription ] = useState(null);
    const [ NewPrice , setNewPrice ] = useState(0);
    const [ OldPrice , setOldPrice ] = useState(0);
    const [ File , setFile ] = useState([]);
    const [ FileUrls , setFileUrls ] = useState([]);

    const filled = () =>{
        if(Name === null){alert("Fill Name");return}
            if(Description === null){alert("Fill Description");return}
            if( NewPrice === null){alert("Fill NewPrice");return}
            if(File === null){alert("Select Image");return}
    }

    //const fileref = ref(storage, "Files/");
    const FileStorer = (e) =>{
        filled()
        for(var i=0 ; i<e.target.files.length ; i++){
            var file = e.target.files[i];
            // eslint-disable-next-line no-loop-func
            setFile((prevState) => [ ...prevState , file]);
        }
    }

    const upload = () => {
        setLoading(true);
        if (File == null) return;
        for(var j=0 ; j<File.length ; j++){
            const FileReference = ref(storage , `Workshop_DP/${File[j].name+Name}`);
            uploadBytes(FileReference , File[j]).then((FileData) => {
                getDownloadURL(FileData.ref).then((url) => {
                    setFileUrls((prev)=>[...prev , url]);
                })
            });
        }
    }

    useEffect(() => {
        if(FileUrls.length !== 0){
            if(FileUrls.length === File.length){
                Axios.put("http://localhost:3001/addWorkshop" , 
                    {
                        image_url : FileUrls,
                        name : Name,
                        description : Description,
                        newprice : NewPrice,
                        oldprice : OldPrice,
                    }).then(()=>{
                        setLoading(false);
                        Navigate("/displayWorkshops" , {state:{check: "in" , status: Location.state.user_status, name : Location.state.user_name , user:Location.state.user , type:Location.state.type , id:Location.state.user_id}});
                    });
                }
            }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    } , [FileUrls])

    return(
        <>
            {
                (Loading)?
                <>
                    <div className='loader-main'>
                        <div className="loader"></div>
                        <p className='loader-text'>Adding Workshop...</p>
                    </div>
                </>
                :
                <div className='overall-log'>
            {/* <p className='header'>Magic Corner</p> */}
            <div className=" main-container">
                <div className="container">
                    <button className="float-start general-button disabled-button" disabled>
                        ADD WORKSHOPS
                    </button>
                    <button className="float-end general-button active-button" 
                    onClick={()=>{Navigate("/products");}}>
                        ADD PRODUCTS
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
                            <div className="col-12">
                                <p className="label-attributes">
                                    WORKSHOP IMAGES:
                                </p>
                                <br></br>
                                <input type="file" accept='image/*' 
                                    className="input-attributes w-100" multiple
                                    onChange={(event)=>{FileStorer(event)}} required>
                                </input>
                            </div>
                        </div>
                        <button className="final-button general-button" onClick={upload}>
                                ADD
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

export default Products;