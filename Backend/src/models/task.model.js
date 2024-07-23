import mongoose from "mongoose"

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    column: { type: String, required: true },
    dueDate: { type: Date },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  });
  
  module.exports = mongoose.model('Task', TaskSchema);