const express = require('express');
const router = express.Router();
const Url = require('./url.js');
const { nanoid } = require('nanoid');

// POST /api/shorten → Create short URL
router.post('/shorten', async (req, res) => {
    const { original_url } = req.body;

    if (!original_url) {
        return res.status(400).json({ error: "Original URL is required" });
    }

    try {
        const shortCode = nanoid(6);
        console.log('Creating URL with:', { original_url, shortCode });
        const newUrl = await Url.create({ original_url, shortCode });
        console.log('URL created successfully:', newUrl);
        res.json({ short_url: `http://localhost:5000/${shortCode}` });
    } catch (error) {
        console.error('Error creating short URL:', error);
        console.error('Error details:', error.message);
        console.error('Error stack:', error.stack);
        res.status(500).json({ error: "Server error", details: error.message });
    }
});

// GET /:shortcode → Redirect
router.get('/:shortcode', async (req, res) => {
    try {
        const url = await Url.findOne({ shortCode: req.params.shortcode });
        if (!url) return res.status(404).json({ error: "URL not found" });

        url.visit_count++;
        await url.save();
        res.redirect(url.original_url);
    } catch (error) {
        console.error('Error finding URL:', error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
