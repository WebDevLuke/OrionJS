//--------------------------------------------------------------------------------------------------------------------------------------
// GET INDEX FUNCTION
//--------------------------------------------------------------------------------------------------------------------------------------

/*
Returns the index of the given element
*/


// EXAMPLE
//--------------------------------------------------------------------------------------------------------------------------------------

/*
// Import helper
var getIndex = require("../helpers/getIndex.js");

// Grab element
var myElem = document.querySelector(".my-elem");

// Get index of myElem
var index = getIndex(myElem);
*/


// CODE
//--------------------------------------------------------------------------------------------------------------------------------------

module.exports = function(elem) {
	var index = 0;
	while ((elem = elem.previousSibling)) {
		if (elem.nodeType != 3 || !/^\s*$/.test(elem.data)) {
			index++;
		}
	}
	return index;
}