const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/user')

mongoose.connection.on('connected', () => {
    console.log('connecting successful now!')
})

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },

    // 头像
    header: {
        type: String
    },

    //职位
    post: {
        type: String
    },

    //个人简介
    post: {
        type: String
    },

    //公司
    company: {
        type: String
    },
    //月薪
    salary: {
        type: String
    }
})

exports.userModel = mongoose.model('userpin', userSchema)

