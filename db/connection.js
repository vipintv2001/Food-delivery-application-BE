const mongoose = require('mongoose');

const connectionString = process.env.DATABASE;

mongoose.connect(connectionString).then((res)=>{
    console.log("mongodb connected succesfully")
}).catch(err=>{
    console.log(err)
})