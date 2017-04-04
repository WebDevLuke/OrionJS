//--------------------------------------------------------------------------------------------------------------------------------------
// BREAKPOINT FUNCTIONS
//--------------------------------------------------------------------------------------------------------------------------------------

/*
A set of breakpoint detection functions which let you measure window width.
*/


// EXAMPLE
//--------------------------------------------------------------------------------------------------------------------------------------

/*
// Import helper
var bp = require("../helpers/breakpoints.js");

// Check if window size is larger or equal to given size
if(bp.min("800px")) {
	return true;
}

// Check if window size is no larger than given size
if(bp.max("800px")) {
	return true;
}

// Check if window size is between the 2 given sizes
if(bp.between("600px", "800px")) {
	return true;
}

*/


// CODE
//--------------------------------------------------------------------------------------------------------------------------------------

var bp = (function(){

	var windowWidth;

	return {

		// Breakpoint detection function
		// eg: if(bp.min("med")){
		min: function(size){

			windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

			if(windowWidth >= parseInt(size)) {
				return true;
			}
			else {
				return false;
			}
		},

		max: function(size){

			windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

			if(windowWidth <= parseInt(size)) {
				return true;
			}
			else {
				return false;
			}
		},

		between: function(from, to){

			windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

			if(windowWidth >= parseInt(from) && windowWidth <= parseInt(to)) {
				return true;
			}
			else {
				return false;
			}
		}
	};

})();

module.exports = bp;