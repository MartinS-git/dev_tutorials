const express = require('express')
//const https = require('https')
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js')

const port = process.env.PORT || 3000
const app = express()

let items = []
let workItems = []

// https://ejs.co/
// https://github.com/mde/ejs/wiki/Using-EJS-with-Express
// Hierfür muss es einen Folder "view" geben, mit min. einier *.ejs Datei
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public')) //Erlaubt Seiten Zugriff auf den Ordner "public" (CSS, JS usw.)

app.get('/', (req, res) => {
	let day = date.getDate();
	res.render('list', {
		listTitle: day, 
		newItems: items
	})
})
app.post('/', (req, res) => {
	//console.log(req.body)
	let newToDo = req.body.newTodo
	// Ein eigner Post für Work funktioniert nicht, weil das Template ein form die action="/" hat. Also zum Home-Route
	if (req.body.listButton === 'Work'){
		workItems.push(newToDo);
		res.redirect('/work')
	} else {
		items.push(newToDo);
		res.redirect('/') //Dedirect zum Home-Route, also nach oben zum "app.get('/', (req, res)...". Somit reagieren wir beim absenden des forms indem wir auf die gleiche Seite verweisen. Also es passiert nichts.
	}
})

app.get('/work', (req, res) => {
	res.render('list',{
		listTitle: "Work List",
		newItems: workItems
	})
})

// Ein eigner Post für Work funktioniert nicht, weil das Template ein form die action="/" hat. Also zum Home-Route
// app.post('/work', (req, res) => {
// 	let newToDo = req.body.newTodo
// 	workItems.push(newToDo);
// 	res.redirect('/work') // 
// })

app.listen(port, () => {
  console.log(`Example app listening on port port`)
})

