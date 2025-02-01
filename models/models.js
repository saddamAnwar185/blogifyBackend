const {model, Schema, default: mongoose} = require('mongoose')
mongoose.connect('mongodb+srv://saddamanwarllc:saddam185@cluster0.aonev.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(()=>{console.log('connected')})

//schemas

const UsersSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    }
})

const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    coverImage: {
        type: String,
        required: true
    },
    createdBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'userModel', 
        required: true 
      },
})

const commentSchema = new mongoose.Schema({
    content: { type: String, required: true },
    blogId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'blogs', 
      required: true 
    },
    createdBy: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'userModel', 
      required: true 
    },
  });

//Models

const userModel = model('userModel', UsersSchema)
const blogModel = model('blogs', blogSchema)
const commentModel = model('comments', commentSchema)

module.exports = {
    userModel,
    blogModel,
    commentModel,
}