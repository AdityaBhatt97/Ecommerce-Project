const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
    {
        title : {type : String }, 
        description : {type : String  }, 
        img : {type : String },
        categories : {type : Array},
        size : {type : Array  },
        color : {type : Array },
        price : {type : Number  },
        inStock : {type: Boolean , default: true}
        

    }, { timestamps : true }
)

module.exports = mongoose.model("Product" , ProductSchema);

