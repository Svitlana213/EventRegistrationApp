const http = require('http');
const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 8080;
const httpServer = http.createServer(app);

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Set views directory
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use("/src", express.static(path.join(__dirname, "src")));
app.use(express.static(path.join(__dirname, "public")));

const db = new sqlite3.Database('./database/database.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        return console.log(err.message);
    }
    console.log('Connected to the SQLite database.');
});

app.use(express.json());

app.get('/', (req, res) => {
    db.all('SELECT * FROM event', (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal server error');
        } else {
            res.render('index', { events: rows });
        }
    });
});

app.get('/registration/:eventId', (req, res) => {
    const eventId = req.params.eventId;
    res.render('register', { eventId });
});

app.post('/register', (req, res) => {
    const { eventId, full_name, email, date_of_birth, source, reason } = req.body;

    db.run('INSERT INTO participants (event_id, full_name, email, date_of_birth, source, reason) VALUES (?, ?, ?, ?, ?, ?)',
        [eventId, full_name, email, date_of_birth, source, reason],
        (err) => {
            if (err) {
                res.status(500).send('Database error');
            } else {
                res.redirect(`/participants/${eventId}`);
            }
        });
});

app.get('/participants/:eventId', (req, res) => {
    const eventId = req.params.eventId;

    db.all('SELECT * FROM participants WHERE event_id = ?', [eventId], (err, rows) => {
        if (err) {
            res.status(500).send('Database error');
        } else {
            res.render('participants', { participants: rows });
        }
    });
});

httpServer.listen(PORT, () => console.debug(`Server listening on http://localhost:${PORT}`));
