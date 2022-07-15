
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/about', (req, res) => {
	res.send("I'm eyepic!")
  })

app.get('/hobbies', (req, res) => {
	res.send("<ul><li>reiten</li><li>malen</li><li>gucken</li></ul>");
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
