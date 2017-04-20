'use strict';

const request = require('request');

const STATE_TREE = {
	"INITIAL_MESSAGE": {
		"message": "What is your favorite color?",
		"options": [
			{ text: "Green", payload: "GREEN" },
			{ text: "Blue", payload: "BLUE" },
			{ text: "Red", payload: "RED" }
		]
	},
	"GREEN": {
		"message": "You said green. I don't believe you. What is your favorite color?",
		"options": [
			{ text: "Green", payload: "GREEN" },
			{ text: "Blue", payload: "BLUE" },
			{ text: "Red", payload: "RED" }
		]
	},
	"BLUE": {
		"message": "You said blue. But really... what is your favorite color?",
		"options": [
			{ text: "Green", payload: "GREEN" },
			{ text: "Blue", payload: "BLUE" },
			{ text: "Red", payload: "RED" }
		]
	},
	"RED": {
		"message": "You said red. Are you sure?",
		"options": [
			{ text: "Green", payload: "GREEN" },
			{ text: "Blue", payload: "BLUE" },
			{ text: "Red", payload: "RED" }
		]
	},
}

var SENDER_STATES = [];

class Game {

	getColor(appFBID, callback) {

		// Get from https://developers.facebook.com/tools/explorer/
		var appAccessToken = '295913870821880|wZ0-d9Vlqy83egpH-lxtLmyqpAs'; 

		request(
			`https://graph.facebook.com/v2.9/${appFBID}/ids_for_pages?page=302357206851919&access_token=${appAccessToken}`,
			(error, response, body) => {
				if (body.data.length > 0) {
					var pageID = body.data[0].id;
					callback(null, SENDER_STATES[pageID]);
				} else {
					callback('Error, no matched ID found');
				}
			}
		);

	}

	processPayload(senderID, payload, callback) {

		console.log(`payload = ${payload}`);

		SENDER_STATES[senderID] = payload;

		var state = STATE_TREE[payload];
		var buttons = state.options.map(option => ({
			title: option.text,
			payload: option.payload,
			type: 'postback'
		}));

		callback({
		    recipient: {
		      	id: senderID
		    },
		    message: {
		    	attachment: {
		    		type: "template",
		    		payload: {
						template_type: "button",
						text: state.message,
						buttons: buttons
			        }
		        }
		    }
	    });
	}
}

module.exports = Game;


