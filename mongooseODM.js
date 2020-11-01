const mongoose = require('mongoose');
const Dishes=require('./models/dishes')
const url="mongodb+srv://admin:admin@node.2trvo.mongodb.net/node?retryWrites=true&w=majority";

const connect=mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true})
connect.then((db)=>{
    console.log("Connected correctly to the DB");
    Dishes.create({
        name:'Bacon Bowl',
        description:'test',

    }).then((dish)=>{
        console.log(dish);
       return Dishes.findByIdAndUpdate(dish._id,{
           $set:{description:'Updated test'}
        },{
            new:true
       }).exec();
    })
    .then((dish)=>{
        console.log(dish);
        dish.comments.push({
            rating:5,
            comment:'Its is good dish',
            author:'Joe Biden'
        })
        return dish.save();
    })
    .then(()=>{
        return mongoose.connection.close()
    })
    .catch((err)=>{
        console.log(err)
    })

    
})

