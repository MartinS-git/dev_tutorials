//Mongoose ist eine npm package was die Eingabe der Datenbank erleichtert bzw. verkürzt
const mongoose = require('mongoose')

// Connection URL and create DB
mongoose.connect('mongodb://127.0.0.1:27017/fruitsDB'); 


// ==============  INSERT START ============== //
const fruitSchema = new mongoose.Schema ({
	// Validation:  ()
	name: {
		type: String,
		required: [true, "Please check your data entry, no name specified!"]
	},
	// Validation:  (Zahl darf nur 1-10 sein)
 	rating: {
		type: Number,
		min: 1,
		max: 10 
	},
	review: String
});
const Fruit = mongoose.model('Fruit', fruitSchema);
const fruit = new Fruit ({
	name: 'Apple',
	rating: 7,
	review: 'Pretty solid as a fruit.'
})
// fruit.save(); // Spechert das obere ab. Jedes mal erneut!


const personSchema = new mongoose.Schema ({ //mongoose erzeugt aus "person" automatisch "people"
	name: String, 
	age: Number,
	favouriteFruit: fruitSchema // *RELATIONSHIP
})
const Person = mongoose.model('Person', personSchema);
// const person = new Person ({
// 	name: 'John',
// 	age: 37
// })

// person.save();


// Mehrere Daten einfügen:
const kiwi = new Fruit ({
	name: 'Kiwi',
	rating: 10,
	review: 'It is the best fruit'
})
const orange = new Fruit ({
	name: 'Orange',
	rating: 4,
	review: 'Too sour for me'
})
const banana = new Fruit ({
	name: 'Banana',
	rating: 3,
	review: 'Weird texture'
})

// Auskommentiert da die Daten jedes Mal erneut gespeichert würden!
// Fruit.insertMany([kiwi, orange, banana], (err) => {
// 	if (err) {
// 		console.log(err);
// 	} else {
// 		console.log('Succesfully saved all the fruits to fruitsDB');
// 	}
// })

// Fruit.insertMany([kiwi, orange, banana], (err) => {

	const nameLess = new Fruit ({
		rating: 3,
		review: 'Weird texture'
	})

// Fruit.insertMany([nameLess], (err) => {
// 	if (err) {
// 		console.log(err);
// 	} else {
// 		console.log('Succesfully saved all the fruits to fruitsDB');
// 	}
// })


// _____________  INSERT END _____________ //



// ==============  FIND START ============== //
Fruit.find( (err, fruits) => {
	if (err){
		console.log(err);
	} else {
		mongoose.connection.close(); //Beendet die Verbindung, wie ansonsten mit cntl+C manuell

		fruits.forEach((fruit) => {
			console.log(fruit.name);
		})
	}
})
// _____________  FIND END _____________ //




// ==============  UPDATE START ============== //
Fruit.updateOne({_id: "62b5ca876c06bf91b9335483"}, {name: "No Name Fruit"}, (err) => {
	if (err){
		console.log(err);
	} else {
		console.log("Succesfully updated the document.");
	}
})
// _____________  UPDATE END _____________ //



// ==============  DELETE START ============== //
Fruit.deleteOne({_id: "62b5e9c12949b62c5d09a762"}, (err) => {
	if (err){
		console.log(err);
	} else {
		console.log("Succesfully deleted item.");
	}
})

// Person.deleteMany({name: "John"}, (err) => {
// 	if (err){
// 		console.log(err);
// 	} else {
// 		console.log("John(s) succesfully deleted.");
// 	}
// })
// _____________  DELETE END _____________ //




// ==============  RELATIONSHIP START ============== //
// Die folge Aenderung wurde oben getaetigt, hier eine Kopie:

// const personSchema = new mongoose.Schema ({ //mongoose erzeugt aus "person" automatisch "people"
// 	name: String, 
// 	age: Number,
// ====> 	favouriteFruit: fruitSchema // *RELATIONSHIP
// })

// const pineapple = new Fruit ({
// 	name: "Pineapple",
// 	rating: 9,
// 	review: "Great fruit."
// })
// pineapple.save();

// const person = new Person({
// 	name: "Amy",
// 	age: 12,
// 	favouriteFruit: pineapple
// })
// person.save();

Person.updateOne({name: "John"}, {favouriteFruit: banana}, (err) => {
	if (err){
		console.log(err);
	} else {
		console.log("Succesfully updated the document.");
	}
})
// _____________  RELATIONSHIP END _____________ //