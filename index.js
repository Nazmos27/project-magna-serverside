const express = require('express');
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000
require('dotenv').config()

//middlewares
app.use(cors())
app.use(express.json())


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
    const allUsersCollection = client.db("magnaDB").collection("usersData")

    app.get('/allPosts', async (req, res) => {
      const result = await allPostsCollection.find().toArray()
      res.send(result)
    })

    app.post('/posts', async (req, res) => {
      const postData = req.body;
      if (!postData) {
        return res.status(422).send({ error: "You must provide data" })
      }
      const insertResult = await allPostsCollection.insertOne(postData);
      res.send(insertResult)
    })


    app.get('/usersInfo',async(req,res)=>{
      const user=req.query.user
      const query = {user:user}
      const result = await allUsersCollection.findOne(query)
      res.send(result)
    })
    app.post('/usersInfo',async(req,res)=>{
      const userData=req.body
      if(!userData){
        return res.status(422).send({error:"you must provide data"})
      }
      const result = await allUsersCollection.insertOne(userData)
      res.send(result)
    })
    app.put('/updateUser/:email',async(req,res)=>{
      const email = req.params.email
      const filter = { user: email }
      const options = { upsert: true }
      const updateData = req.body
      const upadated = {
        $set: {
          user: updateData.userMail,
          cartList:updateData.updatedCart,
          likedPost:updateData.updatedLiked,
        }
      }
      console.log('Update Data : ',updateData)
      const updatedResult = await allUsersCollection.updateOne(filter,upadated,options)
      res.send(updatedResult)
    })
    
    app.put('/posts/:id', async (req, res) => {
      const id = req.params.id
      const filter = { _id: new ObjectId(id) }
      const options = { upsert: true }
      const updateData = req.body
      const upadated = {
        $set: {
          doner: updateData.doner,
          title: updateData.title,
          description: updateData.description,
          img: updateData.img,
          time: updateData.time,
          react: updateData.updatedReact,
        }
      }
      const result = await allPostsCollection.updateOne(filter,upadated,options)
      res.send(result)
    })
    //commenting


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('magna server is running')
})

app.listen(port, () => {
  console.log(`server running on ${port}`)
})


