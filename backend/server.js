const express = require('express')
const userRoutes = require('./routes/userRoutes')
const postRoutes = require('./routes/postRoutes')
const path = require('path')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const multer = require('multer')
const { register, login } = require('./controllers/auth')
const { createPost } = require('./controllers/posts')
const {tokenCheck} = require('./middlewares/auth')



// configurations
dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/assets',express.static(path.join(__dirname,'public/assets')))

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

//testing

// app.get('/test',(req,res) => {
//     console.log(req.user)
//     res.status(200).send('hh')
// })

// connect to database
mongoose.connect(process.env.MONGO_URL)
    .then(app.listen(process.env.PORT, () => console.log(`listening on port: ${process.env.PORT}`)))
    .catch(err => console.log(err))
