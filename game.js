'use strict';

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

	processPayload(senderID, payload, callback) {

		console.log(`payload = ${payload}`);

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


