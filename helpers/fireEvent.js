//--------------------------------------------------------------------------------------------------------------------------------------
// FIRE EVENT FUNCTION
//--------------------------------------------------------------------------------------------------------------------------------------

/*
Manually fires the given event for the given element. If the browser supports the custom event api, you can
pass additional data object with an event
*/


// EXAMPLE
//--------------------------------------------------------------------------------------------------------------------------------------

/*
// Import helper
var fireEvent = require("../helpers/fireEvent.js");

// Grab element
var myElem = document.querySelector(".my-elem");

// Fire custom event with custom data object
fireEvent(myElem, "signup", {
	username: "lukeharrison"
});
*/


// CODE
//--------------------------------------------------------------------------------------------------------------------------------------

// Import modernizr
require("../vendor/modernizrClone.js");

module.exports = function(elem, event, details) {
	if(ModernizrClone.customevent) {
		// Declare event
		var myEvent = new CustomEvent(event, {"bubbles":true, "cancelable":false,"detail":details});
		// Trigger it!
		elem.dispatchEvent(myEvent);
	}
	else if(document.createEventObject){
		// dispatch for IE
		var evt = document.createEventObject();
		elem.fireEvent("on" + event, evt)
	}
	else{
		// dispatch for firefox + others
		var evt = document.createEvent("HTMLEvents");
		evt.initEvent(event, true, true); // event type,bubbling,cancelable
		elem.dispatchEvent(evt);
	}
}