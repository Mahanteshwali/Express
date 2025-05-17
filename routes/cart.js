const express = require('express');
const router = express.Router();
const food = require('../models/foodModel');

router.get('/', async (req, res) => {
    try {
        const foods = await food.find();
        res.status(200).json(foods);
    }
    catch (err) {
        res.status(500).json({ message: 'Internal server Error', err });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const single_food = await food.findById(req.params.id);
        if (!single_food) {
            res.status(400).json({ message: 'Searched food is not found' });
        }
        res.status(200).json({ message: `Food_item sucessfully fetched`,single_food });
    }
    catch (err) {
        res.status(500).json({ message: 'Internal server error', err });
    }
});

router.post('/', async (req, res) => {
    try {
        const { name, description, price, category, quantity, } = req.body;
        const food_item = new food({ name, description, price, category, quantity });
        await food_item.save();
        res.status(200).json({ message: 'food_item is created', food_item });
    }
    catch (err) {
        res.status(400).json({ message: 'unable to create the food_item', err });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { name, description, price, category, quantity, } = req.body;
        const single_food = await food.findByIdAndUpdate(
            req.params.id,
            { name, description, price, category, quantity, }, { new: true }
        );
        if (!single_food) {
            return res.status(400).json({ message: 'food item is not found' });
        };
        res.status(200).json(single_food, { message: 'Fodd item successfully Updated!' });
    }
    catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const { name, description, price, category, quantity } = req.body;
        const single_food = await food.findByIdAndUpdate(
            req.params.id,
            { name, description, price, category, quantity },
            { new: true },
            console.log(`updating the food_items:${req.params.id}: ${req.body}`)
        );
        if (!single_food) {
            console.log(`Error while updating food_item ${req.params.id}: ${req.body}`);
            return res.status(404).json({ message: 'Food item not found' });
        }
        res.status(200).json(single_food);
        console.log(`food_item has Sucessfully Updated: ${req.params.id}: ${single_food}`);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const single_food = await food.findByIdAndDelete(req.params.id,);
        if (!single_food) {
            return res.status(400).json({ message: 'failed to delete the food_item' });
        }
        res.status(200).json({ message: "foood_item Sucessfully Deleted!" });
    }
    catch (err) {
        res.status(500).json({ message: "Internal server Error" });
    };
});

module.exports = router;