'use strict';

const fs = require('fs');

let icons = null;
const siteIcons = [];

if (fs.existsSync(__dirname + '/../../../assets/scss/icons/selection.json')) {

	icons = require(__dirname + '/../../../assets/scss/icons/selection.json');

	if (typeof icons.icons !== 'undefined') {
		icons.icons.forEach(icon => {
			siteIcons.push(icon.properties.name);
		});
	}

}

module.exports = {
	"title": "Icons",
	"status": "wip",
	"order": 2,
	"handle": "icons",
	"meta": {
		"tailwind": true
	},
	"context": {
		"icons": siteIcons
	}
}
