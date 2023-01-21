const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');

let mailTransporter = nodemailer.createTransport(
    {
        service : "gmail",
        auth : {
            user : "manageladen01@gmail.com",
            pass : "ckbjwjcgtddjdadc"
        }
    }
);

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://Rishichaary:rishi12345@ac-hqr0iex-shard-00-00.lfw6dor.mongodb.net:27017,ac-hqr0iex-shard-00-01.lfw6dor.mongodb.net:27017,ac-hqr0iex-shard-00-02.lfw6dor.mongodb.net:27017/main_data?ssl=true&replicaSet=atlas-l3vfnh-shard-0&authSource=admin&retryWrites=true&w=majority" , 
{
    useNewUrlParser:true,
});

const user_model = require('./models/data');
const product_model = require('./models/data1');
const workshop_model = require('./models/workshops');
const admin_model = require('./models/admin');

//--------------------------------------------------------------------User_Mailer----------------------------------------------------------------------

app.post('/userMailer' , (req , res ) => {
    let details = {
        from :"manageladen01@gmail.com",
        to: req.body.mail,
        subject : "OTP To verify your magic corner account.",
        text : "Hi "+req.body.name+","+" Welcome To Magic Corner. Use "+req.body.otp+" To validate your Magic Corner Account. Once Validated You can start using your account after getting a confirmation mail from us."
    };
    mailTransporter.sendMail( details , (err) =>{
        if(err){
            console.log(err);
        }
    } )
});

//--------------------------------------------------------------------Admin_Mailer----------------------------------------------------------------------

app.post('/adminMailer' , (req , res ) => {
    let details = {
        from :"manageladen01@gmail.com",
        to: "rishichaary1903@gmail.com",
        subject : "OTP To verify your magic corner account.",
        text :"Use "+req.body.otp+" To make Mr/Mrs : "+req.body.name+" as Magic Corner Admin.1"
    };
    mailTransporter.sendMail( details , (err) =>{
        if(err){
            console.log(err);
        }
    } )
});

//---------------------------------------------------------------Create_User-----------------------------------------------------------------------

app.post("/addUser" , async (req,res) => {
    const user = new user_model({
        image : req.body.image_url,
        full_name : req.body.name ,
        email : req.body.email ,
        password : req.body.password ,
        mobile_no : req.body.mobile ,
        gender : req.body.gender ,
        age : req.body.age ,
        dob : req.body.dob ,
        "address.house_no" : req.body.house ,
        "address.street" : req.body.street ,
        "address.area" : req.body.area ,
        "address.city" : req.body.city ,
        "address.state" : req.body.state ,
        "address.pin_code" : req.body.pincode ,
    });
    try{
        await user.save();
        let details = {
            from :"manageladen01@gmail.com",
            to: req.body.email,
            subject : "Magic Corner Account Established",
            text : "Hi!! "+req.body.name+", You have dived into the world of handmade things. Start Enjoying Your Shopping."
        };
        mailTransporter.sendMail( details , (err) =>{
            if(err){
                console.log(err);
            }
        } )
    }catch(err){
        console.log(err);
    }
});

//---------------------------------------------------------------Create_Admin-----------------------------------------------------------------------

app.post("/addAdmin" , async (req,res) => {
    const user = new admin_model({
        image : req.body.image_url,
        full_name : req.body.name ,
        email : req.body.email ,
        password : req.body.password ,
        mobile_no : req.body.mobile ,
        gender : req.body.gender ,
        age : req.body.age ,
        dob : req.body.dob ,
        "address.house_no" : req.body.house ,
        "address.street" : req.body.street ,
        "address.area" : req.body.area ,
        "address.city" : req.body.city ,
        "address.state" : req.body.state ,
        "address.pin_code" : req.body.pincode ,
    });
    try{
        await user.save();
        let details = {
            from :"manageladen01@gmail.com",
            to: req.body.email,
            subject : "Magic Corner Account Confirmation.",
            text : "Hi!! "+req.body.name+", You have dived into the world of handmade things. Start Enjoying Your Shopping."
        };
        mailTransporter.sendMail( details , (err) =>{
            if(err){
                console.log(err);
            }
        } )
    }catch(err){
        console.log(err);
    }
});

//---------------------------------------------------------------Create_Product--------------------------------------------------------------------

app.put("/addProduct" , async (req , res) => {
    console.log("Running");
    const Product = new product_model(
        {
            image :req.body.image_url,
            name : req.body.name,
            description : req.body.description,
            newprice : req.body.newprice,
            oldprice : req.body.oldprice,
            category : req.body.category,
            tags : req.body.tags,
            status : req.body.state,
        }
    );
    try{
        await Product.save();
        res.send("Done");
    }catch(err){
        console.log(err);
    }
});

//------------------------------------------------------------Add_Workshop------------------------------------------------------------------------

app.put("/addWorkshop" , async (req , res) => {
    const Workshop = new workshop_model(
        {
            image :req.body.image_url,
            name : req.body.name,
            description : req.body.description,
            newprice : req.body.newprice,
            oldprice : req.body.oldprice,
        }
    );
    try{
        await Workshop.save();
        res.send("Done");
    }catch(err){
        console.log(err);
    }
});

//------------------------------------------------------------All_Featured_Products------------------------------------------------------------------------

app.get("/getAllFeaturedProducts" , ( req , res ) => {
    product_model.find({status: "ON" }, (err , result) => {
        if(err){
            console.log(err);
        }
        res.send(result);
    });
});

//-------------------------------------------------------------All_Products----------------------------------------------------------------------

app.get("/getAllWorkshops" , ( req , res ) => {
    workshop_model.find({ name : {$ne : null} }, (err , result) => {
        if(err){
            console.log(err);
        }
        res.send(result);
    });
});

//--------------------------------------------------------------All_Users-------------------------------------------------------------------------

app.get("/allUsers" , ( req , res ) => {
    user_model.find({projection : {email : true} } , (err , result) => {
        if(err){
            console.log(err);
        }
        res.send(result);
    });
});

//--------------------------------------------------------------All_Admins-------------------------------------------------------------------------

app.get("/allAdmins" , ( req , res ) => {
    admin_model.find({projection : {email : true} } , (err , result) => {
        if(err){
            console.log(err);
        }
        res.send(result);
    });
});

//-----------------------------------------------------------Select_Products----------------------------------------------------------------------
app.put("/getProducts" , (req , res) => {
        Selected_Product_Category = req.body.Category;
        Selected_Product_Tag = req.body.Tag;
        if(Selected_Product_Category == "All"){Selected_Product_Category = null}
        if(Selected_Product_Tag == "All"){Selected_Product_Tag = null}
        if(Selected_Product_Category  != null && Selected_Product_Tag != null){
            product_model.find({category : Selected_Product_Category , tags : Selected_Product_Tag} ,(err , result) =>{
                if(err){
                    console.log(err);
                }
                else{
                    res.json(result);
                }
            });
        }
        else if(Selected_Product_Category != null && Selected_Product_Tag == null ){
            product_model.find({category : Selected_Product_Category} ,(err , result) =>{
                if(err){
                    console.log(err);
                }
                else{
                    res.json(result);
                }
            });
        }
        else if(Selected_Product_Tag != null && Selected_Product_Category == null){
            console.log(Selected_Product_Tag);
            product_model.find({tags : Selected_Product_Tag} ,(err , result) =>{
                if(err){
                    console.log(err);
                }
                else{
                    console.log(result);
                    res.json(result);
                }
            });
        }
        else{
            product_model.find({ name : {$ne : null} }, (err , result) => {
                if(err){
                    console.log(err);
                }
                res.send(result);
            });
        }
    }
);

//---------------------------------------------------------------Select_Users----------------------------------------------------------------------

app.post("/getUsers" , (req , res) => {
    const Selected_User_Data = req.body.name;
} );

app.get("/getUsers" , (req , res) => {
    user_model.findOne({full_name : Selected_User_Data} , (err , result) =>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    } );
});

//--------------------------------------------------------------Update_Product-------------------------------------------------------------------

app.put("/updateProducts" , async (req , res) => {
    try{
        var newDescription = req.body.description;
        var newNewPrice = req.body.newprice;
        var newOldPrice = req.body.oldprice;
        var newCategory = req.body.category;
        var newTags = req.body.tags;
        var newStatus = req.body.state;
        if(newDescription != null){
            await product_model.updateOne({_id : req.body.id} , {$set : {description : newDescription}});
        }
        if(newNewPrice != 0){
            await product_model.updateOne({_id : req.body.id} , {$set : {newprice : newNewPrice}});
        }
        if(newOldPrice != 0){
            await product_model.updateOne({_id : req.body.id} , {$set : {oldprice : newOldPrice}});
        }
        if(newCategory != null){
            await product_model.updateOne({_id : req.body.id} , {$set : {category : newCategory}});
        }
        if(newTags != null){
            await product_model.updateOne({_id : req.body.id} , {$set : {tags : newTags}});
        }
        if(newStatus != null){await product_model.updateOne({_id : req.body.id} , {$set : {status : newStatus}});}
        res.send("Done");

    }catch(err){
        console.log(err);
    } 
} );

//--------------------------------------------------------------Update_Workshop-------------------------------------------------------------------

app.put("/UpdateWorkshops" , async (req , res) => {
    try{
        var newDescription = req.body.description;
        var newNewPrice = req.body.newprice;
        var newOldPrice = req.body.oldprice;
        if(newDescription != null){
            await workshop_model.updateOne({_id : req.body.id} , {$set : {description : newDescription}});
        }
        if(newNewPrice != 0){
            await workshop_model.updateOne({_id : req.body.id} , {$set : {newprice : newNewPrice}});
        }
        if(newOldPrice != 0){
            await workshop_model.updateOne({_id : req.body.id} , {$set : {oldprice : newOldPrice}});
        }
        res.send("Done");
    }catch(err){
        console.log(err);
    } 
} );

//----------------------------------------------------------------------------Delete_Product--------------------------------------------------------------------------

app.put("/DeleteProduct" , async (req , res) => {
    console.log("Running");
    await product_model.deleteOne({_id : req.body.id} , (err , result) => {
        if(err){console.log(err);}
        res.send("Done");
    }).clone();
})

//---------------------------------------------------------------------------Delete_Workshop-------------------------------------------------------

app.put("/DeleteWorkshop" , async (req , res) => {
    await workshop_model.deleteOne({_id : req.body.id} , (err , result) => {
        if(err){console.log(err);}
        res.send("Done");
    }).clone();
})

//---------------------------------------------------------------------------Delete_User-------------------------------------------------------

app.post("/DeleteUser" , async (req , res) => {
    await user_model.deleteOne({email : req.body.email});
});

//-------------------------------------------------------------------------Add_to_Cart-------------------------------------------------------------

app.put("/addToCart" , async(req , res) => {
    if(req.body.type == "user"){
        await user_model.updateOne({email:req.body.user , _id:req.body.id} , {$push : {on_cart : req.body.product_id}});
        res.send("Done");
    }
    else{
        console.log(req.body);
        await admin_model.updateOne({email:req.body.user , _id:req.body.id} , {$push : {on_cart : req.body.product_id}});
        res.send("Done");
    }
});

//---------------------------------------------------------------------Add_to_Wish_List----------------------------------------------------------

app.put("/addToWishList" , async(req , res) => {
    console.log(req.body);
    if(req.body.type == "user"){
        await user_model.updateOne({email:req.body.user , _id:req.body.id} , {$push : {wishlist : req.body.product_id}} , (err , result)=>{
            if(err){console.log(err);}
            res.send("Done");
        }).clone();
    }
    else{
        console.log(req.body);
        await admin_model.updateOne({email:req.body.user , _id:req.body.id} , {$push : {wishlist : req.body.product_id}} , (err,result) =>{
            res.send("Done");
        });
    }
});

//-------------------------------------------------------------------------Selected_Products--------------------------------------------------------

app.put("/getSelectedProducts" , (req,res) => {
    product_model.find({_id:{$in:req.body.id}} , (err , result) => {
        if(err){
            console.log(err);
        }
        res.send(result);
    }).clone()
})

//--------------------------------------------------------------------------Get_Cart_List----------------------------------------------------------

app.put("/getCart" , (req , res) => {
    if(req.body.type == "user"){
        user_model.find({_id:req.body.id} , (err , result) => {
            if(err){console.log(err);}
            res.send(result);
        }).clone()
    }
    else{
        admin_model.find({_id:req.body.id} , (err , result) => {
            if(err){console.log(err);}
            res.send(result);
        }).clone()
    }
});

//----------------------------------------------------------------------------Delete_Cart---------------------------------------------------------

app.put("/deleteMe" , (req , res)=>{
    if(req.body.type === "user"){
        user_model.updateOne({_id:req.body.id} , {$set:{on_cart:req.body.file}} , (err , result)=>{
            if(err){console.log(err)}
            res.send("Done");
        })
    }
    else{
        admin_model.updateOne({_id:req.body.id} , {$set:{on_cart:req.body.file}} , (err , result)=>{
            if(err){console.log(err)}
            console.log(result);
            res.send("Done");
        })
    }
});

//------------------------------------------------------------------------Delete_WishList---------------------------------------------------------

app.put("/deleteWishList" , (req , res)=>{
    if(req.body.type === "user"){
        user_model.updateOne({_id:req.body.id} , {$set:{wishlist:req.body.file}} , (err , result)=>{
            if(err){console.log(err)}
            res.send("Done");
        })
    }
    else{
        admin_model.updateOne({_id:req.body.id} , {$set:{wishlist:req.body.file}} , (err , result)=>{
            if(err){console.log(err)}
            res.send("Done");
        })
    }
});

//---------------------------------------------------------------Search---------------------------------------------------------------------------

app.put("/getSearch" , async (req , res) => {
    await product_model.find({name : {$regex : '.*' + req.body.name+'.*'}} , (err , result) => {
        if(err){console.log(err)}
        res.send(result);
    }).clone()
})

//---------------------------------------------------------------All_Products--------------------------------------------------------------------

app.get("/getAllProducts" , async(req , res) => {
    await product_model.find((err , result) => {
        if(err){console.log(err)}
        res.send(result);
    }).clone()
})

//-------------------------------------------------------------Selected_WorkShops----------------------------------------------------------------

app.put("/getSelectedWorkShops" , async (req , res) => {
    await workshop_model.find({_id : req.body.id} , (err , result) => {
        if(err){console.log(err)}
        res.send(result);
    }).clone();
})

//--------------------------------------------------------------Server----------------------------------------------------------------------------

app.listen(3001, () => {
    console.log("Server On");
} );