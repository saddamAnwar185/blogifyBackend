const { setUser } = require('../middleWares/auth')
const {userModel, blogModel, commentModel} = require('../models/models')

const handleSingUp = async(req, res) => {
    const {name, email, password} = req.body
    const file = req.file
    try {
        const existingUser = await userModel.findOne({email: email})
        if(existingUser){
            res.json({
                'sucess': false,
                'messege': 'This Email is Already exist'
            })
        } else if(!existingUser) {
            const newUser = new userModel({
                name: name,
                email: email,
                password: password,
                profilePic: file.path,
            }).save()

            if(newUser) {
                res.json({
                    'sucess': true,
                    'messege': 'SingUp Sucessfully'
                })
            }

        }
        
        
    } catch (error) {
        if(error) {
            res.json({
                'sucess': false,
                'messege': 'Something Went Wrong'
            })
        }
    }
}

const handleLogin = async(req, res) => {
   const {email, password} = req.body
   try {

    const loginUser = await userModel.findOne({email: email, password: password})
    if(loginUser) {
        const token = setUser(loginUser)
        res.cookie("uid", token, {
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        })

        res.json({
            'sucess': true,
            'messege': 'Login SucessFully',
            'loginUser': loginUser
        })
    }
    else if(!loginUser) {
        res.json({
            'sucess': false,
            'messege': 'Wrong Email or Password'
        })
    }
    
   } catch (error) {
    res.json({
        'sucess': false,
        'messege': error.messege
    })
   }
}

const handleDelete = async(req, res) => {
const id = req.params.id
const deleteUser = await userModel.findById(id)
if(deleteUser.role === 'admin') {
    res.json({
        'sucess': false,
        'messege': `User ${deleteUser.name} is admin`
    })
} else if(deleteUser.role !== 'admin') {
     const deletedUser = await userModel.findByIdAndDelete(id)
     const deleteUserBlogs = await blogModel.deleteMany({createdBy: id})
     const deleteUserComments = await commentModel.deleteMany({createdBy: id})
     if(deleteUser && deleteUserBlogs && deleteUserComments) {
        res.json({
            'sucess': true,
            'messege': `User ${deleteUser.name} has been delete sucessfylly`
        })
     } else if (!deletedUser &&!deleteUserBlogs &&!deleteUserComments) {
        res.json({
            'sucess': false,
            'messege': `SomeThing went wrong`
        })
     }
}
}

const handleBlogPost = async (req, res) => {
    try {
        const { title, description, userId } = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ 'sucess': false, 'messege': 'File is required' });
        }

        const newBlog = new blogModel({
            title,
            description,
            coverImage: file.path,
            createdBy: userId,
        });

        await newBlog.save();

        res.json({
            'sucess': true,
            'messege': 'Blog posted successfully!',
        });
    } catch (error) {
        res.status(500).json({
            'sucess': false,
            'messege': 'Something went wrong!',
            'error': error.message,
        });
    }
};

const handleDeleteBlog = async (req, res) => {
const id = req.params.id
const deleteBlog = await blogModel.findByIdAndDelete(id)
const deleteComments = await commentModel.deleteMany({blogId: id})
if(deleteBlog && deleteComments) {
    res.json({
        'sucess': true,
        'messege': 'blog delete sucessfully'
    })
} else if(!deleteBlog && !deleteComments) {
    res.json({
        'sucess': false,
        'messege': 'Something went wrong'
    })
}
}

const handleViewBlog = async (req, res) => {
    const blogId = req.params.blogId
   try {
    const blog = await blogModel.findById(blogId).populate('createdBy')
    const comments = await commentModel.find({ blogId }).populate('createdBy')
   res.status(200).json({
    blog,
    comments
   })
   } catch (error) {
    res.status(500).json({
        'sucess': false,
        'messege': error.message||'Interval server Error'
    })
   }
}

const handleCommentpost = async(req, res) => {
    const {comment, userId, blogId} = req.body
    try {
        const newComment = await new commentModel({
            content: comment,
            createdBy: userId,
            blogId: blogId
        }).save()
        if (newComment){
            res.status(201).json({
                'sucess': true,
                'messege': 'Comment Post sucessfully'
            })
        }
    } catch (error) {
        res.status(500).json({
            'sucess': false,
            'messege': error.messege || 'Internal Server Error'
        })
    }
}

module.exports = {handleSingUp, handleLogin, handleDelete, handleBlogPost, handleDeleteBlog, handleViewBlog, handleCommentpost}