const path = require("path")
const electron = require('electron')
const fs = require('fs');
let loadedLanguage;
let app = electron.app ? electron.app : electron.remote.app
module.exports = i18n;

// (getLocale) tra ve false => app.getLocale => undefined
function i18n() {

	if (fs.existsSync(path.join(__dirname, 'ja.js'))) {
		console.log(app.getLocale());	
		loadedLanguage = JSON.parse(fs.readFileSync(path.join(__dirname, 'ja.js'), 'utf8'))
	}
	else {
		loadedLanguage = JSON.parse(fs.readFileSync(path.join(__dirname, 'en.js'), 'utf8'))
		console.log('def');
	}
}

i18n.prototype.__ = function (phrase) {
	let translation = loadedLanguage[phrase]
	if (translation === undefined) {
		translation = phrase
	}
	return translation
}
