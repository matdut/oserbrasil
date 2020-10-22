const express = require('express')
const app = express()
const port = 21497
const path = require('path');
const baseDir = `${__dirname}/build/`

app.use(express.static(`${baseDir}`))
app.get('*', (req, res) => res.sendFile('index.html' , {root:baseDir }))


app.listen(port)

