//--------------------------------------------------------------------------------------------------------------------------------------
// CLOSEST PARENT FUNCTION
//--------------------------------------------------------------------------------------------------------------------------------------

/*
Recursively finds the closest parent element which matches the given class or element type.
*/


// EXAMPLE
//--------------------------------------------------------------------------------------------------------------------------------------

/*
// Import helper
var closestParent = require("../helpers/closestParent.js");

// Grab element
var myElem = document.querySelector(".my-elem");

// Grab closest matching parent by classname
var parent = closestParent(myElem, "my-parent");

// Grab closest matching parent by element
var parent = closestParent(myElem, "form");
*/


// CODE
//--------------------------------------------------------------------------------------------------------------------------------------

module.exports = function closestParent(child, match) {
	if (!child || child == document) {
		return null;
	}
	if (child.classList.contains(match) || child.nodeName.toLowerCase() == match) {
		return child;
	}
	else {
		return closestParent(child.parentNode, match);
	}
}