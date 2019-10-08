const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RatingSchema = new Schema({
    movie_id: {
        type: String,
        required: true
    },
    visit_date: {
        type: String,
        default: Date.now
    },
    movie_rating: {
        type: String,
        required: true
    },
    facility_rating: {
        type: String,
        required: true
    },
    feedbackText: {
        type: String,
        required: false
    },
    feedbackPhoto: {
        type: String,
        required: false
    },
    isSatisfied: {
        type: Boolean
    }
});

RatingSchema.index({'$**': 'text'});

module.exports = mongoose.model('Rating', RatingSchema);