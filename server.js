const http = require('http')
const express = require('express')
const path = require('path')

const app = express()
const PORT = 8080
const httpServer = http.createServer(app)

app.use("/src", express.static(path.join(__dirname, "src")))
app.use(express.static(path.join(__dirname, "public")))


app.get('*', (req, res) => {
    const requestedPath = req.path;
    if (requestedPath === '/') {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    } else if (requestedPath === '/registration') {
        res.sendFile(path.join(__dirname, 'public', 'registration.html'));
    } else if (requestedPath === '/participants') {
        res.sendFile(path.join(__dirname, 'public', 'participants.html'));
    } else {
        res.sendFile(path.join(__dirname, 'public', 'error.html'));
    }
});


httpServer.listen(PORT, () => console.debug(`Server listening on http://localhost:${PORT}`))