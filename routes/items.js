const express = require('express');
const router = express.Router();
const Item = require('../models/ItemModel');

// Get all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json({message:'Items fecthed Sucessfullly',items});
  } catch (error) {
    res.status(500).json({ message: 'Error while fetching items',error});
  }
});

// Get a single item
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(201).json({ message: 'Item fetched Sucessfully',item} );
  } catch (error) {
    res.status(500).json({ message: 'Error while fetching item' });
  }
});

// Create a new item
router.post('/', async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const item = new Item({
      name,description,price,category
    });
    await item.save();
    res.status(201).json({message:"Item sucessfully created",item});
  } catch (error) {
    res.status(400).json({ message: 'Error while creating item' },error);
  }
});

// Update an item
router.put('/:id', async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const item = await Item.findByIdAndUpdate(
      req.params.id,
      { name, description, price, category },
      { new: true }
    );
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(201).json({message:"sucessfully updated the item",item});
  } catch (error) {
    res.status(400).json({ message: 'Error updating item' ,error});
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const item = await Item.findByIdAndUpdate(
      req.params.id,
      { name, description, price, category },
      { new: true }
    );
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(201).json({message:"item sucessfully updated",item});
  } catch (error) {
    res.status(500).json({ message: 'item updating failed',error });
  }
});


// Delete an item
router.delete('/:id', async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(201).json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message:"item Deleting failed" ,error});
  }
});

module.exports = router; 