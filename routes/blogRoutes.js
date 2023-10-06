const express = require("express")

const { addBlog, getBlog, } = require("../controller/blogController")

const router = express.Router()

router.route('/blog').post(addBlog)
router.route('/blog').get(getBlog)




module.exports = router