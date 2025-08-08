const mongoose = require("mongoose")

const Schema = mongoose.Schema

const articleSchema = new Schema(
    {
        title : String,
        body : String,
        numberOfLikes : Number 
    }
)

const Atricle = mongoose.model("article",articleSchema)

module.exports = Atricle