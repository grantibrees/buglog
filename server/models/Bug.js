import mongoose from "mongoose"
let Schema = mongoose.Schema

var bug = new Schema({
  closed: { type: Boolean, required: true, default: false },
  description: { type: String, required: true },
  title: { type: String, required: true },
  closedDate: { type: Date },
  creatorEmail: { type: String, required: true }
}, { timestamps: true, toJSON: { virtuals: true } })

bug.virtual("creator",
  {
    localField: "creatorEmail",
    ref: "Profile",
    foreignField: "email",
    justOne: true
  })



export default bug;