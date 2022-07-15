const express = require('express')
const https = require('https')
const bodyParser = require('body-parser')
const mongoose = require("mongoose");
const e = require('express');
// const _ = require("lodash")
const port = process.env.PORT || 3000

const app = express()

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"));

mongoose.connect('mongodb://localhost:27017/RESTapi');
const articleSchema = {
	title: String,
	content: String
}
const Article = mongoose.model("Article", articleSchema);

// Kurzform der Routes
// app.route("/articles").get().post().delete()... 
app.route("/articles")
// GET
.get((req, res) => {
	//Hier keine condition wie bei "find" üblich.
	Article.find( (err, foundArticles) => {
		if (err) {
			res.send(err)
		} else {
			res.send(foundArticles) //liefert den JSON-Code im Browser aus
		}
	}) 
})
// POST
.post((req, res) => {
	//Postman test. Aus Postman werden die Daten via POST gesendet um zu testen, dass diese hier empfangen werden.
	// console.log(req.body.title);
	// console.log(req.body.content);
	const newArticle = new Article ({
		title: req.body.title,
		content: req.body.content
	})
	newArticle.save( (err) => {
		if (!err) {
			res.send("Successfully added a new article.")
		} else {
			res.send(err)
		}
	})
})
// DELETE
// Zum Testen Postman verwenden. Hier im Dropdown "DELETE" wählen.
.delete((req, res) => {
	// 
	Article.deleteMany((err) => { 
		if (!err) {
			res.send("Articles successfully deleted.")
		} else {
			res.send(err)
		}
	})
})

app.route("/articles/:articlesTitle/")
.get((req, res) => {
	const articleTitle = req.params.articlesTitle
	Article.find({title: articleTitle}, (err, foundArticles) => {
		if (err) {
			res.send(err)
		} else {
			res.send(foundArticles) //liefert den JSON-Code im Browser aus
		}
	})	
})
// PUT
// Ersezt den Article (title und content). Wenn nur eine der beide Angaben getätigt wird, wird trotzdem alles überschrieben, halt ohne diese Angabe

//Update funktioniert nicht mehr:
// .put((req, res) => {
// 	Article.update(
// 		{title: req.params.articlesTitle}, //Welcher Articel
// 		{title: req.body.title, content: req.body.content}, //Die zu endernden entries
// 		{ overwrite: true },
// 		(err) => {
// 			if (!err){
// 				res.send("Successfully updated article.")
// 			} else {
// 				res.send("ERROR")
// 			}
// 		})
// })
// Neue Version:
.put((req, res) => {
	Article.replaceOne(
		{title: req.params.articlesTitle}, //Welcher Articel
		{title: req.body.title, content: req.body.content}, //Die zu endernden entries
		{ new: true },
		(err) => {
			if (!err){
				res.send("Successfully updated article.")
			} else {
				res.send(err)
			}
		})
})
// PATCH
// Datet nur ein entry up und ersetzt nicht den gesamten Article 
.patch((req, res) => {
	Article.updateOne(
		{title: req.params.articlesTitle}, 
		{title: req.body.title, content: req.body.content},
		{ new: true },
		(err) => {
			if (!err){
				res.send("Successfully updated article.")
			} else {
				res.send(err)
			}
		})
})
.delete((req, res) => {
	Article.deleteOne(
		{title: req.params.articlesTitle}, 
		(err) => {
			if (!err){
				res.send("Successfully deleted article.")
			} else {
				res.send(err)
			}
		})
})

app.listen(port, () => {
  console.log(`Server ist ready on Port ` + port)
})
