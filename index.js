const express = require('express');
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000
require('dotenv').config()

//middlewares
app.use(cors())
app.use(express.json())


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.choi6e7.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const allPostsCollection = client.db("magnaDB").collection("allPosts")

    app.get('/allPosts',async(req,res)=>{
        const result = await allPostsCollection.find().toArray()
        res.send(result)
    })

    app.post('/allPosts',async(req,res)=>{
      const postData= req.body;
      if(!postData){
        return res.status(422).send({error:"You must provide data"})
      }
      const insertResult = await allPostsCollection.insertOne(postData);
      res.send(insertResult)
    })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/',(req,res) => {
    res.send('magna server is running')
})

app.listen(port,()=>{
    console.log(`server running on ${port}`)
})


