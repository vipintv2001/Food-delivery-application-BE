const mongoose = require("mongoose")

const reviewSchema = new mongoose.Schema({
    userName:{type:String},
    feedback:{type:String},
    rating:{type:Number},
    restaurentId:{type:String}
})

const reviews = mongoose.model('reviews',reviewSchema)

module.exports = reviews;