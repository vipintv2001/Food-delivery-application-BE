const reviews = require('../models/reviewSchema')

exports.addReview = async (req,res)=>{
    console.log("inside add review")
    console.log("reviewbody:",req.body)
    const {name,feedback,rating,restaurentId} = req.body
    try{
        const newReview = new reviews({
            userName:name,
            feedback,
            rating,
            restaurentId
        })
        await newReview.save()
        res.status(200).json(newReview)
    }catch(err){
        console.log(err)
        res.status(401).json(err)
    }
}

exports.getReview = async (req,res)=>{
    console.log("inside get review");
    const {id} = req.params;
    try {
        const restaurentReviews = await reviews.find({restaurentId:id})
        res.status(201).json(restaurentReviews)
    } catch (error) {
        res.status(401).json(error)
    }
}