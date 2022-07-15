//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { list } = require("tar");
const _ = require("lodash")

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// Bevor mongoose:
// const items = ["Buy Food", "Cook Food", "Eat Food"];
// const workItems = [];


// Mit mongoose:
mongoose.connect("mongodb+srv://eye_test:NEomongo77!@cluster0.l1mzq.mongodb.net/todoListDB")

const itemsSchema = {
	name: String
}
const Item = mongoose.model("Item", itemsSchema)

const cookItem = new Item ({
	name: "Cooking"
})
const sleepItem = new Item ({
	name: "Sleeping"
})
const learnItem = new Item ({
	name: "Learning"
})
const defaultItems = [cookItem, sleepItem, learnItem]

// Für customListName:
const listSchema = {
	name: String,
	items: [itemsSchema]
}
const List = mongoose.model("List", listSchema)



app.get("/", function(req, res) {

Item.find( (err, foundItems) => {
	if (foundItems.length === 0){
		Item.insertMany(defaultItems, (err) => {
			if (err){
				console.log(err);
			} else {
				console.log("Default Items inserted.");
			}
		})
		res.redirect("/") //Führt zurück auf die gleiche Seite und dieses if Statement wird übersprungen.
	} else {
		res.render("list", {listTitle: "Today", newListItems: foundItems});
	}
}) 
});
app.post("/", function(req, res){
	const toDo = req.body.newItem;
	const pageURL = req.body.list //Submit-Button value in list.ejs

	const newItem = new Item ({
		name: toDo
	})

	if (pageURL === "Today"){
		newItem.save()
		res.redirect("/") 
	} else {	
		// Wenn es nicht die Root-Page ist, wird nach dem Seitentitel gesucht
		List.findOne({name: pageURL}, (err, foundList) => {
			if(!err){
				// Das neue Item aus dem Submit wird in die Liste der Custom Page gepusht und gespeichert. Struktur siehe "listSchema"
				foundList.items.push(newItem);
				foundList.save();
				res.redirect("/" + pageURL) 
			}
		})	
	}
});

app.post("/delete", function(req, res){
	const checkedItemId = req.body.checkbox //Siehe Comments in list.ejs
	const listName = req.body.listName

	if (listName === "Today"){
		Item.findByIdAndRemove(checkedItemId, (err) => {
			if (err) {
				console.log(err);
			} else {
				console.log("Succesfully deleted item.");
				res.redirect("/") 
			}
		}) 
	} else {
		// $pull entfernt aus einem Array die dahinter gesetzten Konditionen. Hier die entsprechende ID. D.h. wir suchen nach den Daten und ersetzen diese mit dem $pull-Löschvorgang
		 List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemId}}}, (err, foundList) => {
			 if (!err){
				res.redirect("/" + listName) 
			 }
		 })
	}
});


// Custom URL. Z.B. http://localhost:3000/world erzeugt eine eigene Liste
app.get("/:customListName", function(req, res){
  const pageTitle = _.capitalize(req.params.customListName)

//Schaut, ob es diese Page/DB bereits gibt oder nicht
  List.findOne({name: pageTitle}, (err, foundList) => {
	  if (err){
		   console.log(err);
	  } else {
		  //nicht true, also gib es nicht	
		  if (!foundList) { 
			  //Create a new list
			const list = new List({
				name: pageTitle,
				items: defaultItems
			})
			list.save()
			res.redirect("/" + pageTitle)
		  } else {
			//Show an existing list
			res.render("list", {
				listTitle: foundList.name, 
				newListItems: foundList.items
			});
		  }
	  }
  })
});


app.get("/about", function(req, res){
  res.render("about");
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
  console.log("Server has started on port succesfully");
});
