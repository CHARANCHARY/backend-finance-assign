const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['income', 'expense'],
    required: true,
  }
});

// Static method to create default categories
CategorySchema.statics.createDefaultCategories = async function () {
  const categories = [
    { name: 'Salary', type: 'income' },
    { name: 'Groceries', type: 'expense' },
    { name: 'Rent', type: 'expense' },
    { name: 'Investment', type: 'income' },
  ];

  for (const category of categories) {
    // Check if the category already exists to avoid duplicates
    const exists = await this.findOne({ name: category.name });
    if (!exists) {
      const newCategory = new this(category);
      await newCategory.save();
    }
  }
};

// Create the model
const Category = mongoose.model('Category', CategorySchema);

// Immediately invoke the function to create categories when the model is first used
Category.createDefaultCategories().catch(err => console.error(err));

module.exports = Category;
