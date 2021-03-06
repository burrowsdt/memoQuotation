const { apply } = require('async');
const express = require('express');
const { Mongoose } = require('mongoose');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');

app.engine('ejs', ejsMate)

// Models
const Quote = require('./models/quote');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.set('views', path.join(__dirname, 'views'));
app.set('public', path.join(__dirname, 'public'));
app.set('view engine', 'ejs');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/memorizer', { useNewURLParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connection open")
    })
    .catch(err => {
        console.log("Oh no error!")
        console.log(err)
    })

app.listen(3000, () => {
    console.log("App is listening")
})

// Landing page
app.get('/', async (req, res) => {
    let sample = await Quote.aggregate().
        sample(1);
    let qotd = sample[0];
    res.render('landing', { qotd })
})

///// Quotes routes

// See all (manage) quotes
app.get('/quotes', async (req, res) => {
    const quotesArray = await Quote.find({})
    res.render('quotes/index', { quotesArray })
})

// Create new quote (render form)
app.get('/quotes/newQuote', (req, res) => {
    res.render('quotes/new')
})

// Create new quote (post)
app.post('/quotes', async (req, res) => {
    const newQuote = new Quote(req.body.quote);
    newQuote.tags = newQuote.tags[0].split(',').map((el) => el.trim());
    await newQuote.save();
    console.log("Quote submitted:", newQuote)
    res.redirect('/quotes')
})

// Show page for individual quotes
app.get('/quotes/:id', async (req, res) => {
    const { id } = req.params;
    const quoteToDisplay = await Quote.findById(id);
    console.log(quoteToDisplay)
    res.render('quotes/displayQuote', { quoteToDisplay })
})

// Edit quote (render form)

app.get('/quotes/:id/edit', async (req, res) => {
    const { id } = req.params;
    const quoteToEdit = await Quote.findById(id);
    res.render('quotes/edit', { quoteToEdit })
})

// Edit quote (put)
app.put('/quotes/:id', async (req, res) => {
    const {id} = req.params;
    // const {tags} = req.body.quote.tags
    const quoteToUpdate = await Quote.findByIdAndUpdate(id, { ...req.body.quote, new: true });
    // console.log("posted array", req.body.quote.tags)
    quoteToUpdate.tags = req.body.quote.tags.split(',').map((el) => el.trim());
    await quoteToUpdate.save();
    res.redirect(`/quotes/${quoteToUpdate._id}`)
})

// Delete quote
app.delete('/quotes/:id', async (req, res) => {
    const {id} = req.params;
    await Quote.findByIdAndDelete(id);
    res.redirect('/quotes')
})

///// Tags routes

// See all tags
app.get('/tags', async (req, res) => {
    const allTags = await Quote.distinct('tags');
    res.render('tags/index.ejs', { allTags })
})

// Show page for a specific tag
app.get('/tags/:tag', async (req, res) => {
    const { tag } = req.params;
    const quotesToDisplay = await Quote.find({ tags: { $regex: tag, $options: 'i' }});
    console.log(quotesToDisplay)
    res.render('tags/listTags', { quotesToDisplay })
})