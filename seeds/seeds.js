const mongoose = require('mongoose');
const Quote = require('../models/quote');

mongoose.connect('mongodb://localhost:27017/memorizer', { useNewURLParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connection open")
    })
    .catch(err => {
        console.log("Oh no error!")
        console.log(err)
    })

const seedQuotes = [
    {
        text: "Action is eloquence.",
        author: "William Shakespeare",
        tags: "Virtue",
        source: "Coriolanus",
        sourceDetails: "Act 3, Scene 2 - Line 93"
    },
    {
        text: "Be great in act, as you have been in thought.",
        author: "William Shakespeare",
        tags: "Virtue",
        source: "King John",
        sourceDetails: "Act 5,  Scene 1"
    },
    {
        text: "Do not be too moral. You may cheat yourself out of much life so. Aim above morality. Be not simply good—be good for something.",
        author: "Henry David Thoreau",
        tags: "Morality",
        source: "Letter to Harrison Blake",
        sourceDetails: "Act 3 Scene 2 Line 93",
        year: 1848
    },
    {
        text: "Take rest; a field that has rested gives a bountiful crop.",
        author: "Ovid",
        tags: "Rest and Leisure"
    },
    {
        text: "If my hands are fully occupied in holding on to something, I can neither give nor receive.",
        author: "Dorothee Solle",
        tags: ["Being Open", "Letting Go"],
        source: "The Strength of the Weak",
        sourceDetails: "p. 33",
        year: 1984
    },
    {
        text: "Abnormal is so common, it's practically normal.",
        author: "Cory Doctorow",
        source: "Little Brother",
        year: 2008
    },
    {
        text: "A bone to the dog is not charity. Charity is the bone shared with the dog, when you are just as hungry as the dog.",
        author: "Jack London",
        tags: "Charity",
        source: "The Road"
    },
    {
        text: "Don't be miserable before it is time.",
        author: "Seneca",
        tags: ["Mindfulness", "Anxiety and Worry"],
        source: "The Road"
    }
]

const reseedDB = async () => {
    await Quote.deleteMany({});

    await Quote.insertMany(seedQuotes)
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        console.log(err)
    })
}

reseedDB();

