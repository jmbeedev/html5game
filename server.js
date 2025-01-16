const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

// Endpoint untuk mendapatkan data dari scores.json
app.get('/scores', (req, res) => {
    fs.readFile('scores.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading scores.json' });
        }
        res.json(JSON.parse(data));
    });
});

// Endpoint untuk menyimpan data ke scores.json
app.post('/scores', (req, res) => {
    const newScore = req.body;
    fs.readFile('scores.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading scores.json' });
        }
        const scores = JSON.parse(data);
        scores.push(newScore);
        fs.writeFile('scores.json', JSON.stringify(scores, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error writing to scores.json' });
            }
            res.json({ message: 'Score saved successfully!' });
        });
    });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
