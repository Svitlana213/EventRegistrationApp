const http = require('http')
const express = require('express')
const path = require('path')
const sqlite3 = require('sqlite3').verbose()
const bodyParser = require('body-parser')

const app = express()
const PORT = 8000
const httpServer = http.createServer(app)

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use("/src", express.static(path.join(__dirname, "src")))
app.use(express.static(path.join(__dirname, "public")))
app.use(bodyParser.urlencoded({ extended: true }))

const db = new sqlite3.Database('./database/database.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        return console.log(err.message)
    }
    console.log('Connected to the SQLite database.')
})

app.use(express.json())

app.get('/', (req, res) => {
    db.all('SELECT * FROM event', (err, rows) => {
        if (err) {
            console.error(err.message)
            res.status(500).send('Internal server error')
        } else {
            res.render('index', { events: rows })
        }
    })
})

app.get('/registration/:id', (req, res) => {
    const eventId = req.params.id
    res.render('registration', { eventId })
})

app.post('/register', (req, res) => {
    const { event_id, full_name, email, date_of_birth, sourse, reason } = req.body

    db.run('INSERT INTO participants (event_id, full_name, email, date_of_birth, sourse, reason) VALUES (?, ?, ?, ?, ?, ?)',
        [event_id, full_name, email, date_of_birth, sourse, reason],
        (err) => {
            if (err) {
                console.error(err.message)
                res.status(500).send('Database error')
            } else {
                res.redirect(`/participants/${event_id}`)
            }
        })
})

app.get('/participants/:event_id', (req, res) => {
    const eventId = req.params.event_id

    db.all('SELECT * FROM participants WHERE event_id = ?', [eventId], (err, rows) => {
        if (err) {
            res.status(500).send('Database error')
        } else {
            res.render('participants', { participants: rows })
        }
    })
})

httpServer.listen(PORT, () => console.debug(`Server listening on http://localhost:${PORT}`))
