//--------------------------------------------------------------------------------------------------------------------------------------
// DATA-COOKIE COMPONENT
//--------------------------------------------------------------------------------------------------------------------------------------

/*
DATA-COOKIE adds functionality to all elements tagged with data-set-cookie attribute.

On click, sets the cookie specified.
/*

/*
<div data-set-cookie="myCookie"></div>
*/


(function(){

	// Grab all elements with data-round attribute
	var elem = document.querySelectorAll("[data-set-cookie]");

	if(elem.length){
		// Add event listeners to each one
		for(var i = 0; i < elem.length; i++){
			elem[i].addEventListener("click", function(e){
				var cookie = this.getAttribute("data-set-cookie");
				document.cookie = cookie + "=true; expires=Sat, 27 Dec 2025 12:00:00 UTC; path=/";
			});
		}
	}
})();


