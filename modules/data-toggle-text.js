//--------------------------------------------------------------------------------------------------------------------------------------
// DATA-TOGGLE-TEXT COMPONENT
//--------------------------------------------------------------------------------------------------------------------------------------

/*
DATA-TOGGLE-TEXT adds functionality for any components with a data-toggle-text attribute.

It allows you to toggle text content of an element on click.
*/


// DATA ATTRIBUTES
//--------------------------------------------------------------------------------------------------------------------------------------

/*
data-toggle-text (Required)
- On click the elements text content toggles to this
*/


// EXAMPLE
//--------------------------------------------------------------------------------------------------------------------------------------

/*
<div data-toggle-text="Goodbye">Hello</div>

In the example above, when our element is clicked, the "hello" text toggles to "goodbye". When clicked again,
it swaps back.
*/


// CODE
//--------------------------------------------------------------------------------------------------------------------------------------

(function(){

	// Grab all elements with data-show attribute
	var elem = document.querySelectorAll("[data-toggle-text]");

	if(elem.length){
		// Add event listeners to each one
		for(var a = 0; a < elem.length; a++){

			// Grab and store original value
			elem[a].setAttribute("data-toggle-original", elem[i].innerText);
			// Add event listener
			elem[a].addEventListener("click", function(e){
				// Prevent default action of element
				e.preventDefault();
				// Grab toggle value
				var toggleText = this.getAttribute('data-toggle-text'),
				// Grab original value
				originalValue = this.getAttribute("data-toggle-original");
				// Swap text values
				if(this.innerText === toggleText) {
					this.innerText = originalValue;
				}
				else {
					this.innerText = toggleText;
				}
			});
		}
	}

})();