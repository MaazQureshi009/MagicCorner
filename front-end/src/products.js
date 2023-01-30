import { useState , useEffect } from 'react';
import { useNavigate  , useLocation} from 'react-router-dom';
import Axios from 'axios';
import { ref , uploadBytes , getDownloadURL } from 'firebase/storage';
import { storage } from './cloud'
import './users.css';

function Products(){

    const Navigate = useNavigate();
    const Location = useLocation();

    const FileStorer = (e) =>{
        for(var i=0 ; i<e.target.files.length ; i++){
            var file = e.target.files[i];
            // eslint-disable-next-line no-loop-func
            setFile((prevState) => [ ...prevState , file]);
        }
    }


    const [ Loading , setLoading ] = useState(false);
    const [ Name , setName ] = useState(null);
    const [ Description , setDescription ] = useState(null);
    const [ MainCategory , setMainCategory ] = useState(null);
    const [ SubCategory , setSubCategory ] = useState(null);
    const [ NewPrice , setNewPrice ] = useState(0);
    const [ OldPrice , setOldPrice ] = useState(0);
    const [ State , setState ] = useState(null);
    const [ File , setFile ] = useState([]);
    const [ Infos , setInfos ] = useState(null);
    const [ Length , setLength ] = useState(null);
    const [ Breath , setBreath ] = useState(null);
    const [ Height , setHeight ] = useState(null);
    const [ COD , setCOD ] = useState(null);
    const [ FileUrls , setFileUrls ] = useState([]);

    //const fileref = ref(storage, "Files/");

    const filled = () =>{
        if(Name === null){alert("Fill Name");return}
            if(Description === null){alert("Fill Description");return}
            if( NewPrice === null){alert("Fill NewPrice");return}
            if(MainCategory === null){alert("Select Category");return}
            if(SubCategory === null){alert("Select tags");return}
            if(COD === null){alert("Select COD Status");return}
            if(State === null){alert("Select Display Status");return}
            if(File === null){alert("Select Image");return}
    }

    const upload = () => {
        filled()
            setLoading(true);
            if (File == null) return;
            for(var j=0 ; j<File.length ; j++){
                const FileReference = ref(storage , `Product_DP/${File[j].name+Name+j}`);
                uploadBytes(FileReference , File[j]).then((FileData) => {
                    getDownloadURL(FileData.ref).then((url) => {
                        setFileUrls((prev)=>[...prev , url]);
                    })
                });
            }
    }
    useEffect(() =>{
        if(FileUrls.length !== 0){
            if(FileUrls.length === File.length){
                console.log(FileUrls)
        Axios.put("http://localhost:3001/addProduct" , 
            {
                image_url : FileUrls,
                name : Name.toUpperCase(),
                description : Description,
                newprice : NewPrice,
                oldprice : OldPrice,
                category : MainCategory ,
                tags : SubCategory,
                state : State,
                infos : Infos,
                length : Length,
                breath : Breath,
                height : Height,
                cod : COD,
            }).then(() => {
                setLoading(false);
                Navigate("/displayProducts" , {state:{check: "in" , status: Location.state.user_status, name : Location.state.user_name , user:Location.state.user , type:Location.state.type , id:Location.state.user_id}});
            });}}
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [FileUrls])

    return(
        <>
            {
                (Loading)?
                <>
                    <div className='loader-main'>
                        <div className="loader"></div>
                        <p className='loader-text'>Adding Product...</p>
                    </div>
                </>
                :
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
                                    <option className="option-attributes">HOME DECORS</option>
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
                                    <option className="option-attributes">CLOCKS</option>
                                    <option className="option-attributes">WALL HANGINGS</option>
                                    <option className="option-attributes">CURTAIN</option>
                                    <option className="option-attributes">TABLE COVER</option>
                                </select>
                            </div>
                            <div className="col-4">
                                <p className="label-attributes">
                                    LENGTH(m):
                                </p>
                                <br></br>
                                <input type="text" placeholder="3" 
                                    className="input-attributes w-100"
                                    onChange={(event)=>{setLength(event.target.value)}} required>
                                </input>
                            </div>
                            <div className="col-4">
                                <p className="label-attributes">
                                    WIDTH(m):
                                </p>
                                <br></br>
                                <input type="text" placeholder="3" 
                                    className="input-attributes w-100"
                                    onChange={(event)=>{setBreath(event.target.value)}} required>
                                </input>
                            </div>
                            <div className="col-4">
                                <p className="label-attributes">
                                    HEIGHT(m):
                                </p>
                                <br></br>
                                <input type="text" placeholder="3" 
                                    className="input-attributes w-100"
                                    onChange={(event)=>{setHeight(event.target.value)}} required>
                                </input>
                            </div>
                            <div className="col-6">
                                <p className="label-attributes">
                                    COD STATUS:
                                </p>
                                <br></br>
                                <select className="input-attributes w-100" onChange={(event)=>{setCOD(event.target.value)}} required>
                                    <option className="option-attributes">SELECT</option>
                                    <option className="option-attributes">YES</option>
                                    <option className="option-attributes">NO</option>
                                </select>
                            </div>
                            <div className="col-6">
                                <p className="label-attributes">
                                    HOME SCREEN DISPLAY:
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
                                    multiple="multiple"
                                    onChange={(event) =>{FileStorer(event)}} required>
                                </input>
                            </div>
                        </div>
                        <div className="col-12 float-start">
                            <p className="label-attributes">
                                ADDITIONAL INFORMATION'S:
                            </p>
                            <br></br>
                            <input type="text" placeholder="Eg: Aged for 3+." 
                                className="input-attributes w-100"
                                onChange={(event)=>{setInfos(event.target.value)}} required>
                            </input>
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
            <div className='clear'></div>
        </div>
            }
        </>
    );
};

export default Products;