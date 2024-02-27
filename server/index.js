const express = require("express");
const mongoose = require("mongoose");
const productRoute = require("./routes/product")

const cors = require("cors")
const rateLimit = require("express-rate-limit");
const Product = require("./models/Product");
const  products  = require("./products");
const app = express();

// Adding Limit User to not spam
const limiter = rateLimit({
  windowMs : 1000,
  max: 5
})



mongoose.connect("mongodb://127.0.0.1:27017/Boots", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        // Check if the collection is empty
        const count = await Product.countDocuments();
        if (count === 0) {
            // Insert sample data
            await Product.insertMany(products);
            console.log('Sample data inserted into the collection.');
        } else {
            console.log('Collection is not empty. No need to insert data.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });




app.use(limiter);
app.use(cors());
app.use(express.json())
app.use("/api/products" , productRoute);




app.listen( 5000 , () => {
  console.log("Backend Server Is Running!")
})