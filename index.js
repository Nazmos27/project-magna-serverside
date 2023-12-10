// const express = require('express');
// const app = express()
// const cors = require('cors')
// const port = process.env.PORT || 5000
// require('dotenv').config()

// //middlewares
// app.use(cors())
// app.use(express.json())


// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.choi6e7.mongodb.net/?retryWrites=true&w=majority`;

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();

//     const allPostsCollection = client.db("magnaDB").collection("allPosts")
//     const allUsersCollection = client.db("magnaDB").collection("usersData")

//     app.get('/allPosts', async (req, res) => {
//       const result = await allPostsCollection.find().toArray()
//       res.send(result)
//     })

//     app.post('/posts', async (req, res) => {
//       const postData = req.body;
//       if (!postData) {
//         return res.status(422).send({ error: "You must provide data" })
//       }
//       const insertResult = await allPostsCollection.insertOne(postData);
//       res.send(insertResult)
//     })


//     app.get('/usersInfo',async(req,res)=>{
//       const user=req.query.user
//       const query = {user:user}
//       const result = await allUsersCollection.findOne(query)
//       res.send(result)
//     })
//     app.post('/usersInfo',async(req,res)=>{
//       const userData=req.body
//       if(!userData){
//         return res.status(422).send({error:"you must provide data"})
//       }
//       const result = await allUsersCollection.insertOne(userData)
//       res.send(result)
//     })
//     app.put('/updateUser/:email',async(req,res)=>{
//       const email = req.params.email
//       const filter = { user: email }
//       const options = { upsert: true }
//       const updateData = req.body
//       const upadated = {
//         $set: {
//           user: updateData.userMail,
//           cartList:updateData.updatedCart,
//           likedPost:updateData.updatedLiked,
//         }
//       }
//       console.log('Update Data : ',updateData)
//       const updatedResult = await allUsersCollection.updateOne(filter,upadated,options)
//       res.send(updatedResult)
//     })

    // app.put('/posts/:id', async (req, res) => {
    //   const id = req.params.id
    //   const filter = { _id: new ObjectId(id) }
    //   const options = { upsert: true }
    //   const updateData = req.body
    //   const upadated = {
    //     $set: {
    //       doner: updateData.doner,
    //       title: updateData.title,
    //       description: updateData.description,
    //       img: updateData.img,
    //       time: updateData.time,
    //       react: updateData.updatedReact,
    //     }
    //   }
    //   const result = await allPostsCollection.updateOne(filter,upadated,options)
    //   res.send(result)
    // })
//     //commenting


//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     // await client.close();
//   }
// }
// run().catch(console.dir);


// app.get('/', (req, res) => {
//   res.send('magna server is running')
// })

// app.listen(port, () => {
//   console.log(`server running on ${port}`)
// })







// const express = require('express');
// const app = express();
// const cors = require('cors');
// const mongoose = require('mongoose');
// const port = process.env.PORT || 5000;
// require('dotenv').config();

// // Middlewares
// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB using Mongoose
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.choi6e7.mongodb.net/magnaDB?retryWrites=true&w=majority`
// mongoose.connect(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// // Create Mongoose models
// const AllPosts = mongoose.model('AllPost', {
//   doner: String,
//   title: String,
//   description: String,
//   img: String,
//   time: String,
//   react: Array,
// });

// const UsersData = mongoose.model('UsersData', {
//   user: String,
//   cartList: Array,
//   likedPost: Array,
// });

// const Messages = mongoose.model('Messages', {
//   user: String,
//   message: String,
// });

// // Your existing routes with Mongoose
// app.get('/allPosts', async (req, res) => {
//   const result = await AllPosts.find().exec();
//   res.send(result);
// });

// app.post('/posts', async (req, res) => {
//   const postData = req.body;
//   if (!postData) {
//     return res.status(422).send({ error: 'You must provide data' });
//   }
//   const newPost = new AllPosts(postData);
//   const savedPost = await newPost.save();
//   res.send(savedPost);
// });

// app.get('/usersInfo', async (req, res) => {
//   const user = req.query.user;
//   const result = await UsersData.findOne({ user }).exec();
//   res.send(result);
// });

// app.post('/usersInfo', async (req, res) => {
//   const userData = req.body;
//   if (!userData) {
//     return res.status(422).send({ error: 'You must provide data' });
//   }
//   const newUser = new UsersData(userData);
//   const savedUser = await newUser.save();
//   res.send(savedUser);
// });

// app.put('/updateUser/:email', async (req, res) => {

// });

// app.put('/posts/:id', async (req, res) => {
//   const id = req.params.id
//   const filter = { _id: new ObjectId(id) }
//   const options = { upsert: true }
//   const updateData = req.body
//   const upadated = {
//     $set: {
//       doner: updateData.doner,
//       title: updateData.title,
//       description: updateData.description,
//       img: updateData.img,
//       time: updateData.time,
//       react: updateData.updatedReact,
//     }
//   }
//   const result = await allPostsCollection.updateOne(filter, upadated, options)
//   res.send(result)

// });

// // New route to get messages for a particular user
// app.get('/messages/:user', async (req, res) => {
//   const user = req.params.user;
//   try {
//     const messages = await Messages.find({ user }).exec();
//     res.send(messages);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ error: 'Internal Server Error' });
//   }
// });

// // New route to post a message for a particular user
// app.post('/messages/:user', async (req, res) => {
//   const user = req.params.user;
//   const messageData = req.body;

//   if (!messageData || !messageData.message) {
//     return res.status(422).send({ error: 'You must provide a message' });
//   }

//   try {
//     const newMessage = new Messages({ user, message: messageData.message });
//     const savedMessage = await newMessage.save();
//     res.send(savedMessage);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ error: 'Internal Server Error' });
//   }
// });

// // ... (your existing code)

// // Add this line to handle the connection to the database
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => {
//   console.log('Connected to the MongoDB database');
// });

// app.get('/', (req, res) => {
//   res.send('magna server is running');
// });

// app.listen(port, () => {
//   console.log(`server running on ${port}`);
// });


const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require('mongoose')

//connect db 
require('./db/connection');

//import files
const Conversations = require('./models/Conversations.js');
const UsersData = mongoose.model('UsersData', {
  name: String,
  img:String,
  email: String,
  cartList: Array,
  likedPost: Array,
});

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.get('/',async(req,res)=>{
  res.send('Magna server is running with mongoose!');
})

//Routes

app.post('/usersInfo', async (req, res) => {
  const userData = req.body;
  if (!userData) {
    return res.status(422).send({ error: 'You must provide data' });
  }
  const newUser = new UsersData(userData);
  const savedUser = await newUser.save();
  res.send(savedUser);
});




app.post('/conversations',async(req,res) => {
  try{
    const {senderId,receiverId} = req.body;
    const newConversation = new Conversations({members : [senderId,receiverId]});
    await newConversation.save();
    res.status(200).send('Conversation Created Successfully');
  }catch(error){
    console.log('error from /conversation api',error);
  }
})

app.get('/conversations/:userId',async(req,res) => {
  try {
    const userId = req.params.userId;
    const conversations = await Conversations.find({members: {$in : [userId]}});
    const conversationUserData = Promise.all(conversations.map(async (conversation) => {
      const receiverId = await conversation.members.find((member) => member !== userId)
      const user =  await UsersData.findById(receiverId);
      return {user : {email : user.email, name: user.name}, conversationId : conversation._id}
    }))
    console.log('ConversatinUserData',await conversationUserData);
    res.status(200).json(await conversationUserData);
  } catch (error) {
    console.log('Error from /conversation/:userId',error);
  }
})




app.listen(port, () => {
  console.log('Magna server is running on ' + port);
})