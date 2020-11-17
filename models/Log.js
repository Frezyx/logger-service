const { Schema, model } = require('mongoose')

const schema = new Schema({
  message: {
    type: String,
    required: true
  },
  error: {
    type: String,
    required: false
  },
  type: {
    type: String,
    required: false
  },
  stackTrace: {
    type: String,
    required: false
  },
  date: {
    type: String,
    required: false
  },
})

module.exports = model('Log', schema)