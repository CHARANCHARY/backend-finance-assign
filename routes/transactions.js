const express = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Transaction = require('../models/Transaction');
const User = require('../models/User');
const mongoose = require('mongoose');
const router = express.Router();
const Category = require('../models/Category'); // Import the Category model




// GET /summary: Retrieves a summary of transactions (total income, total expenses, balance)
router.get('/summary', auth, async (req, res) => {
  const { startDate, endDate, category } = req.query;
  console.log("User ID:", req.user.id);
  
  
  try {
    let filter = { user: req.user.id };
    console.log(filter);

    // Filter by date range if provided
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }

    // Filter by category if provided
    if (category) {
      const categoryObj = await Category.findOne({ name: category });
      if (categoryObj) {
        filter.category = categoryObj._id;
      } else {
        return res.status(400).json({ msg: 'Category not found' });
      }
    }

    // Retrieve transactions based on the filter
    const transactions = await Transaction.find(filter);
    console.log("Filter:", filter);
    console.log("Transactions Found:", transactions);

    // Calculate total income and expenses
    const totalIncome = transactions
      .filter((t) => t.type === 'income')
      .reduce((acc, t) => acc + t.amount, 0);

    const totalExpenses = transactions
      .filter((t) => t.type === 'expense')
      .reduce((acc, t) => acc + t.amount, 0);

    const balance = totalIncome - totalExpenses;

    // Return the summary
    res.json({ totalIncome, totalExpenses, balance });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});





























// POST /transactions: Adds a new transaction (income or expense)
router.post(
  '/',
  [
    auth,
    [
      check('type', 'Type is required').isIn(['income', 'expense']),
      check('category', 'Category is required').not().isEmpty(),
      check('amount', 'Amount is required').isNumeric(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { type, category: categoryName, amount, description } = req.body;

    try {
      // Find the category by name
      const category = await Category.findOne({ name: categoryName });
      if (!category) {
        return res.status(400).json({ msg: 'Category not found' });
      }

      const newTransaction = new Transaction({
        type,
        category: category._id, // Use the ObjectId of the found category
        amount,
        description,
        user: req.user.id, // Links to the authenticated user
      });
      console.log("User ID:", req.user.id);
      const transaction = await newTransaction.save();
      res.status(201).json(transaction);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

// GET /transactions: Retrieves all transactions for the authenticated user
router.get('/', auth, async (req, res) => {
  try {
    console.log("User ID:", req.user.id);

    const transactions = await Transaction.find({ user: req.user.id }).populate('category');
    res.json(transactions);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// GET /transactions/:id: Retrieves a transaction by ID
router.get('/:id', auth, async (req, res) => {
  const { id } = req.params;

  // Validate transaction ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: 'Invalid transaction ID' });
  }

  try {
    const transaction = await Transaction.findById(id);
    if (!transaction) {
      return res.status(404).json({ msg: 'Transaction not found' });
    }
    if (transaction.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    res.json(transaction);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// PUT /transactions/:id: Updates a transaction by ID
router.put('/:id', auth, async (req, res) => {
  const { id } = req.params;

  // Validate transaction ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: 'Invalid transaction ID' });
  }

  const { type, category, amount, description } = req.body;

  try {
    let transaction = await Transaction.findById(id);
    if (!transaction) {
      return res.status(404).json({ msg: 'Transaction not found' });
    }
    if (transaction.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    // Update transaction fields
    transaction.type = type || transaction.type;
    transaction.category = category || transaction.category;
    transaction.amount = amount || transaction.amount;
    transaction.description = description || transaction.description;

    await transaction.save();
    res.json(transaction);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// DELETE /transactions/:id: Deletes a transaction by ID
router.delete('/:id', auth, async (req, res) => {
  const { id } = req.params;

  // Validate transaction ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: 'Invalid transactin ID' });
  }

  try {
    const transaction = await Transaction.findById(id);
    if (!transaction) {
      return res.status(404).json({ msg: 'Transaction not found' });
    }
    if (transaction.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Transaction.deleteOne({ _id: id });
    res.json({ msg: 'Transaction removed' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});




module.exports = router;
