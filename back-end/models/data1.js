const mongoose = require('mongoose');

const product_schema = new mongoose.Schema({
    image : {
        type : String,
        required : true,
    },
    name : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    newprice : {
        type : Number,
        required : true,
    },
    oldprice : {
        type : Number,
    },
    category : {
        type : String,
        required : true,
    },
    tags : {
        type : String,
        required : true,
    },
    status : {
        type : String,
        required : true,
    }
});

const Product  = mongoose.model("Product_data" , product_schema);
module.exports = Product;