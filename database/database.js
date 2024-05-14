const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        return console.log(err.message)
    }
})


const eventTable = `
    CREATE TABLE IF NOT EXISTS event(
        "id" INTEGER PRIMARY KEY AUTOINCREMENT,
        "title" TEXT NOT NULL,
        "description" TEXT NOT NULL,
        "event_date" TEXT NOT NULL,
        "organizer" TEXT NOT NULL
    )
`
db.run(eventTable)

const participantsTable = `
    CREATE TABLE IF NOT EXISTS participants(
        "id" INTEGER PRIMARY KEY AUTOINCREMENT,
        "event_id" INTEGER,
        "full_name" TEXT NOT NULL,
        "email" TEXT NOT NULL,
        "date_of_birth" TEXT NOT NULL,
        "sourse" TEXT NOT NULL,
        "reason" TEXT NOT NULL,
        FOREIGN KEY (event_id) REFERENCES event(id)
    )
`
db.run(participantsTable)