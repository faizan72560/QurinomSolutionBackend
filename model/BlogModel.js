const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema({

  title: {
    type: String
  },
  description: {
    type: String
  },
  imageUrl: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

})





module.exports = mongoose.model("blogss", blogSchema);
