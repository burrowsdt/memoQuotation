const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    subject: {
        type: String
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