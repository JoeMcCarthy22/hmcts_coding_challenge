/* requirements:

title
description
status
dueDate
createdAt
updatedAt

*/

const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100
    },

    description: {
      type: String,
      trim: true,
      maxlength: 500
    },

    status: {
      type: String,
      enum: ['todo', 'done'],
      default: 'todo'
    },

    dueDate: {
      type: Date,
      required: false
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Task', taskSchema)