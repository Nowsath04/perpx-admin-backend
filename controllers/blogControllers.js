// create new blog

const Blogs = require("../models/blog")
const asyncHandler = require("../utils/asyncHandler")
const AWS = require("aws-sdk")
const dotenv = require("dotenv").config()
const fs = require("fs")
const ErrorHandler = require("../utils/ErrorHandler")
const categorys = require("../models/category")


const bucketName = process.env.aws_bucket;
const awsConfig = ({
    accessKeyId: process.env.AccessKey,
    secretAccessKey: process.env.SecretKey,
    region: process.env.region,
})

const S3 = new AWS.S3(awsConfig);
const uploadToS3 = (fileData) => {
    return new Promise((resolve, reject) => {
        const params = {
            Bucket: bucketName,
            Key: `${Date.now().toString()}.jpg`,
            Body: fileData,
        };
        S3.upload(params, (err, data) => {
            if (err) {
                return reject(err);
            }
            return resolve(data.Location);
        });
    });
};


const uploadImageToS3 = async (file) => {
    const imageBlob = fs.readFileSync(file.path);
    return await uploadToS3(imageBlob);
};

exports.NewBlog = asyncHandler(async (req, res, next) => {
    const { mainheading, maincontent, content, category, meta_description, meta_keywords, meta_title, url } = req.body;

    const blogImage = req.file;

    // Upload the images to S3
    const imageUrl = await uploadImageToS3(blogImage);

    const isUrlExist = await Blogs.exists({ url });
    if (isUrlExist) {
        return next(new ErrorHandler("This URL already exists", 401));
    }

    // Create a new blog entry with both images
    const blog = await Blogs.create({
        imageurl: imageUrl,
        mainheading,
        maincontent,
        content,
        category,
        meta_description,
        meta_keywords,
        meta_title,
        url
    });

    res.status(201).json({
        success: true,
        blog
    });
    console.log(blog);
});




// get single blog

exports.GetSingleBlog = asyncHandler(async (req, res, next) => {
    const singleBlog = await Blogs.findById(req.params.id)

    res.status(200).json({
        success: true,
        singleBlog
    })
})

// get single blog url


exports.GetSingleBlogUrl = asyncHandler(async (req, res, next) => {
    console.log(req.params.id);
        const singleBlog = await Blogs.find({url:req.params.id})
    
        res.status(200).json({
            success: true,
            singleBlog
        })
    })



// delete single blog

exports.DeleteSingleBlog = asyncHandler(async (req, res, next) => {

    const deleteBlog = await Blogs.findByIdAndDelete(req.params.id)

    res.status(200).json({
        success: true,
    })

})



// update single blog

exports.UpdateSingleBlog = asyncHandler(async (req, res, next) => {
    const { mainheading, maincontent, content, category, meta_description, meta_keywords, meta_title, url } = req.body;

    try {

        if (req.file) {
         imageUrl = await uploadImageToS3(req.file);
        }

        const updateData = {
            imageurl: imageUrl,
            mainheading,
            maincontent,
            content,
            category,
            meta_description,
            meta_keywords,
            meta_title,
            url
        };

        const updatedBlog = await Blogs.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!updatedBlog) {
            return next(new ErrorHandler("Blog not found", 404));
        }

        res.status(200).json({
            success: true,
            updatedBlog,
        });
    } catch (error) {
        console.error("Update Error:", error);
        next(error);
    }
});







// get all blog

exports.getAllBlog = asyncHandler(async (req, res, next) => {

    const allBlog = await Blogs.find()

    res.status(200).json({
        success: true,
        allBlog
    })

})


exports.allCategory = asyncHandler(async (req, res) =>{

const data = await categorys.find({})

const value = data.filter(item => item.categories).map(item => item.categories);
res.status(200).json({
    success: true,
    value
})

})


exports.createCategory = asyncHandler(async (req, res) =>{

const {category} = req.body

const categorydata = await categorys.findOne({categories:category})

if(!categorydata){
    
    const data = await categorys.create({categories:category})
    res.status(200).json({ message:"Category created successfully"})


}else{
    res.status(200).json({ message:"Already Category created"})
}

})


exports.updateCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { category } = req.body;
  
    try {
      const updatedCategory = await categorys.findByIdAndUpdate(
        id,
        { categories: category },);
  
      if (updatedCategory) {
        res.status(200).json({ message: "Category updated successfully" });
      } else {
        res.status(404).json({ message: "Category not found" });
      }
    } catch (error) {
     console.log(error);
    }
  });