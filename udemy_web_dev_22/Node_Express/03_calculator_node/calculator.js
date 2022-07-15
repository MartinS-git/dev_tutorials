const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true })); //Modus für Daten aus anderen Dateien (__dirname + "/bmiCalculator.html"). Es gibt noch json und text

app.get('/', (req, res) => {
  res.send('Hello Calculator!')
});

app.get('/bmicalculator', (req, res) => {
	res.sendFile(__dirname + "/bmiCalculator.html")
});
app.post('/bmicalculator', (req, res) => {
	var num1 = Number(req.body.weight); //body parser erlaubt es so die Daten aus html-body zu ziehen 
	var num2 = Number(req.body.height) / 100; 
	console.log(num2);
	num2 =  Math.pow(num2, 2);

	console.log(num2);
	
	var resBMI = Math.round(num1 / num2);
	res.send("<h1>Your BMI is:</h1><p><strong>" + resBMI + "</strong></p>");
	
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000.');
});