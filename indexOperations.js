const MongoClient=require('mongodb').MongoClient
const assert = require('assert');
const dboper=require('./operataions');
const uri = "mongodb+srv://admin:admin@node.2trvo.mongodb.net/user?retryWrites=true&w=majority";
MongoClient.connect(uri, (err,cluster)=>{
    
    const db=cluster.db('node')
    console.log("YEP")
    const collection='users';
    dboper.insertDocument(db,{firstName:"Mubashir",lastName:"Ali Baig"}, collection,(result)=>{
        console.log('Inserting Document:\n', result.ops);
        dboper.findDocument(db,collection,(docs)=>{
            console.log('Found Documents:\n',docs);
            dboper.updateDocument(db, {firstName:'Mubashir'},{firstName:'Mudassir',lastName:'Ali Baig'},collection,(result)=>{
                console.log('Updated Document:\n', result.result);
                dboper.findDocument(db,collection,(docs)=>{
                    console.log('Found Updated Documents:\n',docs);
                    cluster.close()
                });
            });          
        });
    });     
});


