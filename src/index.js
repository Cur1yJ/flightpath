const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 8080;
const host = process.env.HOST || '127.0.0.1';

const { findStartAndEndFlight } = require('./findStartAndEndFlight.js');

app.use(bodyParser.json());

/**
 * Endpoint to find start and end airport from a list of flights.
 * Expects a JSON body with a key `flights` containing an array of flight pairs.
 * Example request body:
 * {
 *   "flights": [["SFO", "EWR"], ["ATL", "SFO"]]
 * }
 */
app.post('/calculate', (req, res) => {
    const { flights } = req.body;

    if (!Array.isArray(flights) || !flights.every(flight => Array.isArray(flight) && flight.length === 2)) {
        return res.status(400).json({ error: 'Invalid input format. Please provide an array of flight pairs.' });
    }

    const result = findStartAndEndFlight(flights);

    if (result) {
        res.json({ start: result[0], end: result[1] });
    } else {
        res.status(400).json({ error: 'No valid flight path found.' });
    }
});

if (require.main === module) {
    app.listen(port, host, () => {
        console.log(`Flight Path Calculator is running on http://${host}:${port}`);
    });
}

module.exports = { app };