const express = require('express')
const app = express()
const https = require('https');
const bodyParser = require('body-parser')
const port = 3001

// Mehr Info: https://nodejs.org/api/https.html#httpsgeturl-options-callback
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
	res.sendFile(__dirname + "/index.html")
})
app.post('/', (req, res) => {
	let lat = req.body.lat
	let long = req.body.long
	const url = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=1558f8c3cfb3cc54ff0bb0c9c62148e6&units=metric"
	https.get(url, (resp) => {
		
		resp.on("data", (data => {
			const weatherData = JSON.parse(data); // Wandelt in Json um. IN Json umwandeln: "JSON.stringify(DATEI)"
			const weatherTemp = weatherData.main.temp
			const weatherDescription = weatherData.weather[0].description
			const icon = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png"
			

			// res.send("<h1>The temperature in " +  weatherData.name + " is " + weatherTemp+ " degrees Celcius.</h1><p>Currently it is " + weatherDescription +"</p>" )
			res.write("<h1>The temperature in " +  weatherData.name + " is " + weatherTemp + " degrees Celcius.</h1>")
			res.write("<p>Currently it is " + weatherDescription +"</p>")
			res.write("<img src=" + icon + ">")
			
			res.send()
		}))

	})

}).on('error', (e) => {
	console.error(e);
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

