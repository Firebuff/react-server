const { userModel } = require('../db/models.js')

const md5 = require('md5')

var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {title: 'Express'})
});



// 注册
router.post('/register', (req, res, next) => {
    const { username, password, type } = req.body
    // 根据注册的用户名查找数据库，如果数据库没有该用户，就注册
    userModel.findOne({username}, (err, resData) => {
        if (err) {
            console.log(err)
            return
        }
        if (resData) {
            res.send({code: 0, msg: '此用户已存在'})
        } else {
            console.log(876)
            new userModel({username,type,password: md5(password)}).save( (err, saveData) => {
                if (err) {
                    console.log(err)
                    return
                }
                res.cookie('userId', saveData._id, {maxAge: 1000*60*60*24})

                let returnData = {
                    username,
                    type,
                    _id: saveData._id
                }
                res.send({code: 1, data: returnData, msg: '注册成功'})
            })
        }
    })
})

// 登录
router.post('/login', (req, res, next) => {
    let { username, password } = req.body

    userModel.findOne({ username, password: md5(password)}, (err,resData) => {
        if (err) {
            console.log(err)
            return res.send({code: 0, msg: '用户名或密码不正确'})
            
        }

        if (resData) {
            console.log(resData)
            res.cookie('userId', resData._id, {maxAge: 1000*60*60*24})
            res.send({code: 1, data: resData, msg: '登录成功'})
        } else {
            return res.send({code: 0, msg: '用户名或密码不正确'})
        }
        
    })
})


// 更新用户信息
router.post('/update', (req, res, next) => {

    let userId = req.cookies.userId

    if (!userId) {
        return res.send({code: 0, msg: '请先登录'})
    } 

    const updateData = req.body

    userModel.findByIdAndUpdate({_id: userId}, updateData, (err, oldData) => {
        // 返回旧的对象
        if (err) {
            console.log(err)
            return res.send({code: 0, msg: '更新失败'})
        } 
        const { _id, username, type } =  oldData

        let returnData = Object.assign({_id, username, type},updateData )

        res.send({code: 1, data: returnData, msg: '更新成功'})
    })
})

// 获取用户信息
router.get('/user', (req, res) => {
    const userId = req.cookies.userId
    if (!userId) {
        return res.send({code: 0, msg:'请先登录'})
    }
    userModel.findOne({_id: userId}, (err, resData) => {
        if (err) {
            console.log(err)
            return res.send({code: 0, msg:'查询失败'})
        }
        if (resData) {
            res.send({code: 1, data: resData, msg: '查询成功'})
        } else {
            res.clearCookie('userId')
            res.send({code: 0, msg:'查询失败'})
        }
    })
})








module.exports = router;