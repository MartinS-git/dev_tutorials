const express = require('express')
const https = require('https'); //In Node dabei um externe APIs anzusprechen
const bodyParser = require('body-parser') //NPM Modul um Daten von der HTML Seite auszulesen

const app = express()
app.use(express.static("public")) // Macht Ordner "public" öffentlich. Für statische Inhalte wie CSS oder Bilder.

app.use(bodyParser.urlencoded({ extended: true })) // body-parser Aufruf um html Seiten zu ermöglichen. Es gibt noch JSON und Text Modi 

// Mit app.get rufen wir "/" (Port:3000) auf. Und responsen die dann sichtbare HTML Seite. 
  app.get('/', (req, res) => {
	res.sendFile(__dirname + "/signup.html")
  });
  
// Mittels app.post können wir Daten aus dem form (method: POST) Daten abfangen und verarbeiten bzw. antworten. Ohne POST erhält die obere HTML Seite einen 404, weil nichts zurück kommt.  
  app.post('/', (req, res) => {
	  const firstName = req.body.fName; //body-parser erlaubt es so die Daten aus. <form class="form-signin" action="/" method="POST"> action und method muss im Tag stehen.
	  const lastName = req.body.lName;
	  const eMail = req.body.eMail;

	// +++ Mailchimp integration ++++
	// Weitere Infos hier: https://mailchimp.com/developer/marketing/api/lists/batch-subscribe-or-unsubscribe/
	//  Mailchimp API Key: eca5e043776f976147fbe28ab44c19e3-us18
	// List ID: 0902e164c8
	const data = {
		members: [ 
			{
				email_address: eMail,
				status: "subscribed",
				merge_fields:{ 
				// Mögliche Parameter stehen hier: https://us18.admin.mailchimp.com/lists/settings/merge-tags?id=291854
					FNAME: firstName,
					LNAME: lastName
				}
			}
		]
	}
	const jsonData = JSON.stringify(data) // Wandelt das obere Object in JSON um

	const url = "https://us18.api.mailchimp.com/3.0/lists/0902e164c8"
	const options = {
		method: "POST",
		auth: "_eyepic:eca5e043776f976147fbe28ab44c19e3-us18"
	}
	//https://nodejs.org/api/https.html#httpsrequesturl-options-callback
	const request = https.request(url, options, (response) => {
		response.on("data", (data) => {
			console.log(JSON.parse(data))

			const statusCode = response.statusCode
			if (statusCode === 200){
				res.sendFile(__dirname + "/success.html");
			} else {
				res.sendFile(__dirname + "/failure.html");
			}			
		})
	})
	// Unser Object wir so übergeben. 
	request.write(jsonData)
	request.end()

  }).on('error', (e) => {
	console.error(e); 
  });
  
  // Redirect einer nicht existierenden Seite zurück zum Root. Für die Buttons auf den Success/Error Seiten/
  app.post('/redirect', (req, res) => {
	res.redirect("/")
  });

  app.listen(process.env.PORT || 3000, () => {
	console.log('Example app listening on port 3000.');
  });