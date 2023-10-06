const express = require('express')
const router = express.Router()
const Blog = require('../model/BlogModel')
const cloudinary = require("cloudinary")



exports.addBlog = (async (req, res) => {
    try {
        console.log(req.body)
        const { title, description, image } = req.body
        const imageUrl = await cloudinary.uploader.upload(image, {
            folder: 'blog_images'
        });
        console.log(req.body, imageUrl)
        const blog = await Blog.create({
            title: title, description: description, imageUrl: imageUrl.url
        })
        if (blog) {
            res.status(200).json({ success: true, message: "Blog added successfully" })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: "false",
            message: err.message
        })
    }

})

exports.getBlog = (async (req, res) => {
    try {
        console.log(req.body)
        const blog = await Blog.find()
        res.status(200).json({
            success: "true",
            blog: blog
        })
    } catch (err) {
        res.status(500).json({
            success: "flase",
            message: err.message
        })

    }

})