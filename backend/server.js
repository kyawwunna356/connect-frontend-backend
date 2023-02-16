const express = require('express')
const { createServer } = require( "http");
const { Server } = require("socket.io");
const userRoutes = require('./routes/userRoutes')
const postRoutes = require('./routes/postRoutes')
const conversationRoutes = require('./routes/conversationRoutes')
const messageRoutes = require('./routes/messageRoutes')
const path = require('path')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const multer = require('multer')
const { register, login } = require('./controllers/auth')
const { createPost } = require('./controllers/posts')
const {tokenCheck} = require('./middlewares/auth');
const { addUser, removeUser, getUser } = require('./utils/socketUtils');



// configurations
dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/assets',express.static(path.join(__dirname,'public/assets')))

//http server for socket.io and insert app
const httpServer = createServer(app);

//initilize socket.io
const io = new Server(httpServer, { 
    cors: {
        origin: "http://localhost:3000"
    } 
});

//multer config
const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,path.join(__dirname,'public/assets'))
    },
    filename: (req,file,cb) => {
        console.log(file)
        console.log(req.body)
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const fileName = uniqueSuffix +'-'+ file.originalname 
        req.fileName = fileName
        cb(null, fileName)
    }
})

const upload = multer({ storage: storage })


//file routes
app.post('/posts',upload.single('imageFile'), tokenCheck, createPost)
app.post('/auth/register', upload.single('imageFile'), register)

// Routes
app.post('/auth/login', login)
app.use('/users',userRoutes)
app.use('/posts',postRoutes)
app.use('/conversation',conversationRoutes)
app.use('/message',messageRoutes)





//////////////////////////// socket  section   //////////////////////////
let onlineUsers = []


io.on("connection", (socket) => {

    //on connections
    console.log('a user connected')
   
    //Connects when opening the messenger
    socket.on('addUser', (userId) => {
        onlineUsers = addUser({onlineUsers,userId,socketId: socket.id})
        io.emit('onlineUsers',onlineUsers)
        console.log('connect', onlineUsers)
    })

    socket.on('sendMessage', async ({ senderId, receiverId, text}) => {
        console.log('this is from ', senderId, text)
        const user =  await onlineUsers.find(user => user.userId === receiverId)
        console.log(`this is socket and ${user?.socketId}`)
        io.to(user?.socketId).emit('getMessage', {senderId, text})
        // io.emit('gg', 'this is broadcast to all')
    })

    //disconnect
    socket.on('disconnect', () => {
        console.log('this run')
        socket.disconnect()
        onlineUsers =  onlineUsers.filter(user => user.socketId !== socket.id)
        io.emit('onlineUsers',onlineUsers)
        console.log('disconnect', onlineUsers)
        // socket.emit('hello' ,'this is hello')
    })
    
  });



  // connect to database
mongoose.connect(process.env.MONGO_URL)
.then(httpServer.listen(process.env.PORT, () => console.log(`listening on port: ${process.env.PORT}`)))
.catch(err => console.log(err))