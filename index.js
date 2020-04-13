const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = process.env.PORT || 5000;

const uri = process.env.DB_PATH;
let client = new MongoClient(uri ,{useNewUrlParser:true, useUnifiedTopology: true})


app.get('/' , (req, res) => {
    res.send("Welcome to hot-onion-restaurent-db");
})


app.get('/foods' , (req, res) => {
    client = new MongoClient(uri ,{useNewUrlParser:true});
    client.connect(err => {
        if(err){
            console.log(err);
        }else{
            const collection = client.db('hot-onion-restaurent-db').collection('foods');
            collection.find().toArray((rej,documents) => {
                if(rej){
                    console.log(rej);
                    res.status(500).send("Filed to Fetch Data ")
                }else{
                    res.send(documents);
                }
                client.close()
            })
        }
    })
})

app.get('/food/:id', (req,res) => {
    client = new MongoClient(uri,{useNewUrlParser:true,useUnifiedTopology: true})
    const foodId = Number(req.params.id)

    client.connect(err => {
        const collection = client.db('hot-onion-restaurent-db').collection('foods');
        console.log(foodId);
        collection.find({id:foodId}).toArray((err, documents) => {
            if(err){
                console.log(err);
            }else{
                res.send(documents[0]);
            }
            client.close();
        })
    })
})

app.get('/features' , (req,res) => {
    client = new MongoClient(uri , {useNewUrlParser:true , useUnifiedTopology: true});
    client.connect(err => {
        const collection = client.db('hot-onion-restaurent-db').collection('features');
        collection.find().toArray((rej,documents) => {
            if(rej){
                res.status(500).send("Failed to fetch data");
            }else{
                res.send(documents)
            }
        }) 
        
    })

})

// Post routes
app.post('/submitorder' , (req,res) => {
    const data = req.body;
    console.log(data);
    client = new MongoClient(uri , {useNewUrlParser:true , useUnifiedTopology: true});
    client.connect(err => {
        const collection = client.db('hot-onion-restaurent-db').collection('orders');
        collection.insert(data , (rej, result) =>  {
            if(rej){
                res.status(500).send("Filed to inset")
            }else{
                res.send(result.ops[0])
            }
        })
    })
})

// Bellows are dummy post method used just one time
app.post('/addFoods' , (req,res) => {
    const data = req.body;
    console.log(data);
    client = new MongoClient(uri , {useNewUrlParser:true , useUnifiedTopology: true});
    client.connect(err => {
        const collection = client.db('hot-onion-restaurent-db').collection('foods');
        collection.insert(data , (rej, result) =>  {
            if(rej){
                res.status(500).send("Filed to inset")
            }else{
                res.send(result.ops)
            }
        })
    })
})
app.post('/addfeatures' , (req,res) => {
    const data = req.body;
    console.log(data);
    client = new MongoClient(uri , {useNewUrlParser:true , useUnifiedTopology: true});
    client.connect(err => {
        const collection = client.db('hot-onion-restaurent-db').collection('features');
        collection.insert(data , (rej, result) =>  {
            if(rej){
                res.status(500).send("Filed to inset")
            }else{
                res.send(result.ops)
            }
        })
    })
})

app.listen(port, err => {
    err ? console.log(err) : console.log("Listing for port :" , port);
})






// const express = require('express')
// const app = express()
// const port = 5000

// const cors = require('cors')
// app.use(cors())

// const bodyParser = require('body-parser')
// app.use(bodyParser.json())


// // const dbUser = dbUser;
// // const DB_PASS="nkJmdZBWoy90Ubm7"

// app.get('/', (req, res) => res.send('Welcome to hot-onion-restaurent-server'))



// // const MongoClient = require('mongodb').MongoClient;
// // const uri = "mongodb+srv://dbUser:nkJmdZBWoy90Ubm7@cluster0-skxyb.mongodb.net/test?retryWrites=true&w=majority";
// // const client = new MongoClient(uri, { useNewUrlParser: true ,useUnifiedTopology: true });


// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://dbUser:nkJmdZBWoy90Ubm7@cluster0-skxyb.mongodb.net/test?retryWrites=true&w=majority";
// let client = new MongoClient(uri, { useNewUrlParser: true ,useUnifiedTopology: true });

// client.connect(err => {
    
//   const collection = client.db("hot-onion-restaurent-db").collection("foods");
//   // perform actions on the collection object

//   collection.insert({
//           name:"laptop",
//           price:30000,
//           stock:40
//       },(err,result)=>{
//           console.log("successfully inserted...");
//           console.log("err:",err);
//           console.log("result:",result.ops);
//       })
//   console.log("database connect :)");
//   //client.close();
// });




// app.listen(port, () => console.log(`listening to port:${port}`))

