// Import Express.js and create a new router object
const router = require("express").Router();
// Import the Blog model from "../models/model"
let Product = require("../models/model");



// Define a new route at "/add" that listens for HTTP POST requests (add student)
router.route("/add").post((req,res)=>{

    // Extract the values for the title, imgurl, and paragraph fields from the HTTP request body
    const name = req.body.name;
    const price = req.body.price;
    const image = req.body.image;

    // Create a new Product object with the extracted values
    const newProduct = new Product({
        name,
        price,
        image
    })

    // Save the new Blog object to the database
    newProduct.save().then(()=>{
        // If the save operation is successful, send a JSON response indicating that the blog has been added
        res.json("Product Added....")
    }).catch((err)=>{
        // If an error occurs, log it to the console
        console.log(err);
    })

});


// Define a new route for HTTP GET requests  (get all students details)
router.route("/").get((req,res)=>{

    // Use the Mongoose model Blog to find all documents in the "blogs" collection
    Product.find().then((products)=>{
        // If the query is successful, send a JSON response containing the found documents
        res.json(products)
    }).catch((err)=>{
        // If an error occurs, log it to the console
        console.log(err)
    })

});


// Define a new route for HTTP PUT requests at the "/update/:id" path of the application (update data)
router.route("/update/:id").put(async (req,res)=>{

    // Extract the blog post ID from the URL parameters
    let productId = req.params.id;

    // Extract the updated blog post details from the request body
    const { name, price, image } = req.body;    

    // Create an object with the updated blog post details
    const updateProduct = {
        name,
        price,
        image
    }

    // Use the Mongoose model Blog to find and update the document with the specified ID
    const update = await Product.findByIdAndUpdate(productId, updateProduct)
    .then(()=>{
        // If the update is successful, send a success response containing the updated document
        res.status(200).send({status: "Product Updated"})
    }).catch((err)=>{
        // If an error occurs, log it to the console and send an error response
        console.log(err);
        res.status(500).send({status: "Error with updating data", error: err.message});
    })

});


// Define a new route for HTTP DELETE requests at the "/delete/:id" path of the application (delete data)
router.route("/delete/:id").delete(async (req,res)=>{

    // Extract the blog post ID from the URL parameters
    let productId = req.params.id;

    // Use the Mongoose model Blog to find and delete the document with the specified ID
    await Product.findByIdAndDelete(productId)
    .then(()=>{
        // If the delete is successful, send a success response
        res.status(200).send({status: "Product Deleted"})
    }).catch((err)=>{
        // If an error occurs, log it to the console and send an error response
        console.log(err);
        res.status(500).send({status: "Error with deleting data", error: err.message});
    })
});


// Define a new route for HTTP GET requests at the "/get/:id" path of the application (get one )
router.route("/get/:id").get(async (req,res)=>{
    // Extract the blog post ID from the URL parameters
    let productId = req.params.id;

    // Use the Mongoose model Blog to find the document with the specified ID
    await Product.findById(productId)
    .then((product)=>{
        // If the fetch is successful, send a success response with the blog post data
        res.status(200).send({status: "Product fetched", product: product})
    }).catch((err)=>{
        // If an error occurs, log it to the console and send an error response
        console.log(err);
        res.status(500).send({status: "Error with fetching data", error: err.message});
    })
})


module.exports = router;