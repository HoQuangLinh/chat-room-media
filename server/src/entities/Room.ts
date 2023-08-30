import mongoose from 'mongoose'
const roomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    creator: {
      type: mongoose.Types.ObjectId,
      ref: 'user',
      required: true
    },
    visibility: {
      type: String,
      enum: ['public', 'private'],
      default: 'public'
    },
    avatar: {
      type: String
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('room', roomSchema)
