import mongoose from "mongoose"
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

var note = new Schema({
  content: { type: String, required: true },
  bug: { type: ObjectId, ref: 'Bug', required: true },
  flagged: { type: String, enum: ["pending", "completed", "rejected"] },
  creatorEmail: { type: String, required: true },
}, { timestamps: true, toJSON: { virtuals: true } })

note.virtual("creator",
  {
    localField: "creatorEmail",
    ref: "Profile",
    foreignField: "email",
    justOne: true
  })

export default note;