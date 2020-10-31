const MongoClient=require('mongodb').MongoClient
const assert = require('assert');
const dboper=require('./resolving-callback-hell');
const uri = "mongodb+srv://admin:admin@node.2trvo.mongodb.net/user?retryWrites=true&w=majority";
MongoClient.connect(uri).then((cluster)=>{
    
    const db=cluster.db('node')
    console.log("YEP")
    const collection='users';
    dboper.insertDocument(db,{firstName:"Mubashir",lastName:"Ali Baig"}, collection)
        .then((result)=>{
            console.log('Inserting Document:\n', result.ops);
            return  dboper.findDocument(db,collection)
        })   
        .then((docs)=>{
            console.log('Found Documents:\n',docs);
            return dboper.updateDocument(db, {firstName:'Mubashir'},{firstName:'Mudassir',lastName:'Ali Baig'},collection)
        }) 
        .then((result)=>{
            console.log('Updated Document:\n', result.result);
            return dboper.findDocument(db,collection)
        })
        .then((docs)=>{
            console.log('Found Updated Documents:\n',docs);
            cluster.close()
        })
        .catch((err)=>{
            console.log(err)
        });
})
.catch((err)=>{
    console.log(err);
})


