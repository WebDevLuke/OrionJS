//--------------------------------------------------------------------------------------------------------------------------------------
// CLOSEST PARENT FUNCTION
//--------------------------------------------------------------------------------------------------------------------------------------

/*
Recursively finds the closest parent element which has the specified class.
*/


// EXAMPLE
//--------------------------------------------------------------------------------------------------------------------------------------

/*
// Import helper
var closestParent = require("../helpers/closestParent.js");

// Grab element
var myElem = document.querySelector(".my-elem");

// Grab parent
var parent = closestParent(myElem, ".my-parent");
*/


// CODE
//--------------------------------------------------------------------------------------------------------------------------------------

module.exports = function closestParent(child, className) {
	if (!child || child == document) {
		return null;
	}
	if (child.classList.contains(className)) {
		return child;
	} else {
		return closestParent(child.parentNode, className);
	}
}