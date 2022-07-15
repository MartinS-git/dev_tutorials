require('dotenv').config() //Muss ganz oben stehen
// Die .env-Datei sollte in der .gitignore ausgeschlossen werden! 
const express = require('express')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')
const passportLocalMongoose = require('passport-local-mongoose')
const port = process.env.PORT || 3000

const app = express()

app.use(express.static("public"))
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))

app.use(session({
	secret: 'My secret string.',
	resave: false,
	saveUninitialized: false
  }))

app.use(passport.initialize())
app.use(passport.session())

mongoose.connect('mongodb://localhost:27017/userDB');

const userSchema = new mongoose.Schema ({
	email: String,
	password: String
})
userSchema.plugin(passportLocalMongoose)

const User = new mongoose.model("User", userSchema);
// use static authenticate method of model in LocalStrategy
passport.use(User.createStrategy());
// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/', (req, res) => {
	res.render("home")
})


app.get('/login', (req, res) => {
	res.render("login")
})
app.post('/login', (req, res) => {
	const user = new User({
		username: req.body.username,
		password: req.body.password
	})
	//login comes from passport
	req.login(user, (err) => {
		if (err) {
			console.log(err);
		} else {
			passport.authenticate("local")(req, res, () => {
				res.redirect("/secrets")
			})
		}
	})
})

app.get('/logout', (req, res) => {
	// logout comes from passport
	req.logout()
	res.redirect("/")
})


app.get('/register', (req, res) => {
	res.render("register")
})
app.get("/secrets", (req, res) => {
	if (req.isAuthenticated()){
		res.render("secrets")
	} else {
		res.redirect("/login")
	}
})
app.post('/register', (req, res) => {
	//User.register comes from passport-local-mongoose
	User.register({username: req.body.username}, req.body.password, (err, user) => {
		if (err) {
			console.log(err);
			res.redirect("/register")
		} else {
			passport.authenticate("local")(req, res, () => {
				res.redirect("/secrets")
			})
		}
	})
})


app.listen(port, () => {
  console.log(`Example app listening on port ` + port)
})
