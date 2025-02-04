const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const {cheackUser} = require('./middleWares/auth')
const {userModel, blogModel} = require('./models/models')
const serveStatic = require('serve-static');
const path = require('path')
const dotenv = require('dotenv')
dotenv.config()


const PORT = process.env.PORT || 8000
// const pathName = path.resolve()

app.use(cors({
  origin: 'https://blogify-frontend-mu.vercel.app', // Allow only your frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  credentials: true, // Allow cookies and authentication headers
}));

app.options('/api/*', cors());

//Routes
const singUp = require('./routes/singUp')
const login = require('./routes/login')
const userDelete = require('./routes/delete')
const addBlog = require('./routes/addBlog')
const deleteBlog = require('./routes/deleteBlog')
const showImages = require('./routes/ShowImage')
const clearCookies = require('./routes/clearCookies')
const viewBlog = require('./routes/ViewBlog')
const addComment = require('./routes/postComment')
const showProfile = require('./routes/showProfilePics')
const verifyUser = require('./routes/verifyLogin')
const deleteComment = require('./routes/deleteComments')
const admin = require('./routes/admin')
const myProfile = require('./routes/myProfile')

//middleWares

  
app.use(express.json())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
  setHeaders: (res) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://blogify-frontend-mu.vercel.app'); // Allow all origins
  }
}));

app.get("/", (req, res) => {
    res.json({
        'messege': 'Hello From Server'
    })
})

app.get('/api/', async(req, res) => {
    const allBlogs = await blogModel.find({}).populate('createdBy')
    res.json(allBlogs)
})
app.use('/api/', singUp)
app.use('/api/', login)
app.use('/api/' ,showImages)
app.use('/api/' ,showProfile)
app.use('/api/' ,clearCookies)
app.use('/api/' ,viewBlog)
app.use('/api/', addComment)
app.use('/api/', deleteComment)
app.use('/api/', admin)
app.use('/api/', myProfile)
app.use('/api/', cheackUser ,verifyUser)
app.use('/api/', cheackUser ,userDelete)
app.use('/api/', cheackUser ,addBlog)
app.use('/api/', cheackUser ,deleteBlog)

// app.use(express.static(path.join(pathName, "frontend/build")))
// app.get('*', (_,res) => {
//     res.sendFile(path.resolve(pathName, "frontend", "build", "index.html"))
// })

app.listen(PORT, ()=>{
    `server started at http://localhost:${PORT}`
})
