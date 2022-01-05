const mongoose = require("mongoose")

const EventSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true
    }
})

let Event = mongoose.model('Event',EventSchema,'events')

module.exports = Event