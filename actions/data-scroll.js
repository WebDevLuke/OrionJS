//--------------------------------------------------------------------------------------------------------------------------------------
// DATA-SCROLL COMPONENT
//--------------------------------------------------------------------------------------------------------------------------------------

/*
DATA-SCROLL adds functionality for any elements with a data-scroll attribute.

Provides smooth scroll functionality to either an element or a relative point.

Uses: http://iamdustan.com/smoothscroll/
*/


// DATA ATTRIBUTES
//--------------------------------------------------------------------------------------------------------------------------------------

/*
data-scroll (Required)
- If an element class is passed, on click the browser smooth scrolls to it.
- If a number is passed, the browser smooth scrolls down by that px amount. Negative values can also be passed
to make the browser scroll up by an amount.
*/


// EXAMPLE
//--------------------------------------------------------------------------------------------------------------------------------------

/*
<div data-scroll="target">Hello</div>

In the example above, when our element is clicked the browser smooth scrolls to the element with a
"target" class.

<div data-scroll="100">Hello</div>

In the example above, when our element is clicked the browser smooth scrolls 100px downwards. If the value
were "-100" the browser would smooth scroll 100px upwards.
*/


// CODE
//--------------------------------------------------------------------------------------------------------------------------------------

require('smoothscroll-polyfill').polyfill();

(function(){

	// Grab all elements with data-toggle-text attribute
	var elems = document.querySelectorAll("[data-scroll]"),
	attrValue;

	// Add event listeners to each one 
	for(var a = 0; a < elems.length; a++){
		elems[a].addEventListener("click", function(e){
			// Prevent default behavior
			e.preventDefault();
			// Check if we have an element or a number and act accordingly
			if(!parseInt(this.getAttribute("data-scroll"))) {
				// Grab linked element
				attrValue = document.querySelector("." + this.getAttribute("data-scroll"));
				// Initate scroll into view
				attrValue.scrollIntoView({ 
					behavior: 'smooth',
					block: 'end'
				});
			}
			else {
				attrValue = this.getAttribute("data-scroll");
				window.scrollBy({
					top: attrValue,
					left: 0,
					behavior: 'smooth'
				});
			}
		});
	}

})();