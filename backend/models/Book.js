const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Book title is required"],
      trim: true,
      minlength: 2
    },
    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true,
      minlength: 2
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true
    },
    isbn: {
      type: String,
      required: [true, "ISBN is required"],
      unique: true,
      trim: true
    },
    publishedYear: {
      type: Number,
      min: 1000,
      max: new Date().getFullYear()
    },
    status: {
      type: String,
      enum: ["Available", "Borrowed"],
      default: "Available"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);