const MongoClient=require('mongodb').MongoClient
const assert = require('assert');
const dboper=require('./operataions');
const uri = "mongodb+srv://admin:admin@node.2trvo.mongodb.net/user?retryWrites=true&w=majority";
MongoClient.connect(uri, (err,cluster)=>{
    
    const db=cluster.db('node')
    console.log("YEP")
    const collection=db.collection('users');
    collection.insertOne({"firstName":"Harry","lastName":"Potter"},
    (err,result)=>{
        assert.equal(err,null)
        console.log('After insert')
        console.log(result.ops);
    
        collection.find({}).toArray((err,docs)=>{
            assert.equal(err,null);
            console.log('Found:\n');
            console.log(docs);
            cluster.close()  
        })
    })

})


