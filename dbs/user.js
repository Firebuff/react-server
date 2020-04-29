const mongoose = require('./index')



let stuSchema = new mongoose.Schema({

    name: {
        type: String
    },
    gender: {
        type: String
    },
    age: {
        type: Number
    }
})

let studentModel = mongoose.model('info',stuSchema, 'info')


exports.addOne = function  (data,callback) {
    let studentInstance = new studentModel(data)

    /*{
        name: '胡八一',
        age: 29,
        gender: 'male'
    }*/
    studentInstance.save((err, res) => {
        if (err) {
            console.log(err)
            return
        } 
        callback(res)
    })
}

exports.addMore = function (arr, callback) {
    studentModel.create(arr, (err, res) => {
        if (err) {
            console.log(err)
            throw err
        }

        callback(res)
    })
}

exports.remove = function (where, callback) {
    studentModel.remove(where, (err, res) => {
        if (err) {
            console.log(err)
            throw err
        }

        callback(res)
    })
}

exports.find = function (where, keys, callback) {
    studentModel.find(where, keys,(err, res) => {
        if (err) {
            console.log(err)
            throw err
        }

        callback(res)
    })
}