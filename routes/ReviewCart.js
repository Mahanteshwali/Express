const express = require("express");
const router = express.Router();
const Review = require("../models/ReviewModel");

router.get("/", async (req, res) => {
  try {
    const Reviews = await Review.find();
    res.status(200).json({ message: "reviews Fetched Sucessfullly", Reviews });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const Review_item = await Review.findById(req.params.id);
    if (!Review_item) {
      return res.status(400).json({ message: "no reviews found" });
    }
    res
      .status(200)
      .json({ message: "Product Review Fetched Sucessfullly", Review_item });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

router.post("/", async (req, res) => {
  try {
    const { product_id, name, description, ratings, createdAt } = req.body;
    const Review_item = new Review({
      product_id,
      name,
      description,
      ratings,
      createdAt,
    });
    await Review_item.save();
    res.status(201).json({ message: "Review is created", Review_item });
  } catch (error) {
    res.status(400).json({ message: "failed to create a review" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { product_id, name, description, ratings, createdAt } = req.body;
    const Review_item = await Review.findByIdAndUpdate(req.params.id, {
      product_id,
      name,
      description,
      ratings,
      createdAt,
    });
    if (!Review_item) {
      return res.status(400).json({ message: "failed to update the review" });
    }
    res.status(201).json({ message: "Review is updated", Review_item });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const { product_id, name, description, ratings, createdAt } = req.body;
    const Review_item = await Review.findByIdAndUpdate(req.params.id, {
      product_id,
      name,
      description,
      ratings,
      createdAt,
    });
    if (!Review_item) {
      return res.status(400).json({ message: "failed to update the review" });
    }
    res.status(201).json({ message: "Review is updated", Review_item });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const review_delete = await Review.findByIdAndDelete(req.params.id);
    if (!review_delete) {
      res.status(400).json({ message: "Failed to delete the review" });
    }
    res.status(200).json({ message: "Review Sucessfullly deleted" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
