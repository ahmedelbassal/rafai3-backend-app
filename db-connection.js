// import mongoose module 
const mongoose = require("mongoose")

// connect to server of mongoDB  
    // for local host :     'mongodb://localhost/e_commerce'
const localhost='mongodb://localhost/e_commerce';

// for atlas link      mongodb+srv://sarah:<password>@cluster0.9riej.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
mongoose.connect('mongodb+srv://rafia3:rafia3123@cluster0.9riej.mongodb.net/ecommerce?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
}).then(
    () => {
        console.log("connected to mongoDB sever");
    }
).catch(
    () => {
        console.log("Failed to connect to mongoDB server");
    }
)
