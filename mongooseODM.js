const mongoose = require('mongoose');
const Dishes=require('./models/dishes')
const url="mongodb+srv://admin:admin@node.2trvo.mongodb.net/node?retryWrites=true&w=majority";

const connect=mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true})
connect.then((db)=>{
    console.log("Connected correctly to the DB");
    Dishes.create({
        name:'Custard Bowl',
        description:'test'
    }).then((dish)=>{
        console.log(dish);
       return Dishes.find({}).exec();
    })
    .then(()=>{
        return mongoose.connection.close()
    })
    .catch((err)=>{
        console.log(err)
    })

    
})

