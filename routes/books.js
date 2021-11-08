const express = require("express");
const router = express.Router();
const {Book , validateBook } = require('../models/books');

//POST: Create a new book
router.post("/", async (req, res ) => {
    const error = await validateBook(req.body);
    if(error.message) res.status(400).send(error.message);
    
    book = new Book({
        name: req.body.bookName,
        author:{
            name: req.body.authorName,
            age: req.body.authorAge
        },
        genre:req.body.genre,
    });

    book
        .save()
        .then((book) => {
            res.send(book);
        })
        .catch((error) => {
            res.status(500).send("Books was not stored on DB yet");
        });
});

//GET : All Books
router.get("/", (req,res) => {
    Book.find()
    .then((books) => res.send(books))
    .catch((error) => {
        res.status(500).send("Something went wrong");
    });
});

//Get the book by ID
router.get("/:bookId" , async (req, res ) => {
    const book = await Book.findById(req.params.bookId);
    if(!book) res.status(404).send("Book not found");
    res.send(book);
});

//Update book by ID
router.put('/:bookId', async (req, res) => {
    const updateBook = await Book.findByIdAndUpdate(
    req.params.bookId, 
    {
        name:req.body.bookName,
        author:{
            name:req.body.authorName,
            age:req.body.authorAge
        },
        genre:req.body.genre
    },
    {new:true}
    );
    if(!updateBook) res.status(404).send("book not found");
    res.send(updateBook);
});

//Delete book by ID
router.delete('/:bookId', async (req,res) => {
    const book = await Book.findByIdAndRemove(req.params.bookId);
    if(!book) res.status(404).send("book with ID not found");
    res.send(book);
})

module.exports = router;