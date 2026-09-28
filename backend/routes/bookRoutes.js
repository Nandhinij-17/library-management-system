const express = require("express");
const Book = require("../models/Book");

const router = express.Router();

// GET all books / search
router.get("/", async (req, res) => {
  try {
    const search = (req.query.search || "").trim();
    const filter = search
      ? {
          $or: [
            { title: { $regex: search, $options: "i" } },
            { author: { $regex: search, $options: "i" } },
            { category: { $regex: search, $options: "i" } },
            { isbn: { $regex: search, $options: "i" } }
          ]
        }
      : {};

    const books = await Book.find(filter).sort({ createdAt: -1 });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch books", error: error.message });
  }
});

// GET one book
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (error) {
    res.status(400).json({ message: "Invalid book ID" });
  }
});

// CREATE
router.post("/", async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (error) {
    const message = error.code === 11000 ? "ISBN already exists" : error.message;
    res.status(400).json({ message });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (error) {
    const message = error.code === 11000 ? "ISBN already exists" : error.message;
    res.status(400).json({ message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Invalid book ID" });
  }
});

module.exports = router;