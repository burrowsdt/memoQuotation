const mongoose = require('mongoose');

// Normalization functions
function toLower(v) {
    return v.toLowerCase();
  }

const quoteSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    tags: {
        type: Array
    },
    source: {
        type: String
    },
    sourceDetails: {
        type: String
    },
    year: {
        type: Number
    }
},
    { timestamps: true });

const Quote = mongoose.model('Quote', quoteSchema);

module.exports = Quote;