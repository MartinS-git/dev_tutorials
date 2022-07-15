exports.getDate = () => {
	let today = new Date()
	// Darstellungsform für das Datum
	let options = {
		weekday: "long",
		day: "numeric",
		month: "long"
	}
	return today.toLocaleDateString("us-US", options)
}

exports.getDay = () => {
	let today = new Date()
	// Darstellungsform für das Datum
	let options = {
		weekday: "long"
	}
	return today.toLocaleDateString("us-US", options)
}
