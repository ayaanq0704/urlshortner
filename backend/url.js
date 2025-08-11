const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    original_url: { type: String, required: true },
    shortCode: { type: String, required: true, unique: true },
    visit_count: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Url', urlSchema);
