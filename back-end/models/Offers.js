const mongoose = require('mongoose');

const offer_schema = new mongoose.Schema({
    name : {
        type : String,
    },
    min_price : {
        type : String,
    },
    discount : {
        type : String,
    },
    status : {
        type : String,
    }
});

const Offers = mongoose.model("Offers" , offer_schema);
module.export = Offers;