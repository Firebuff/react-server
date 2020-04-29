const mongoose = require('mongoose')

const DBUrl = 'mongodb://localhost:27017/student'

mongoose.connect(DBUrl)

mongoose.connection.on('connected', () => {
	// console.log('successful')
})

module.exports = mongoose