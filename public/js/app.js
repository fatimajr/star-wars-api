var template = '<div class="col s12 m4">' +
		    '<div class="card horizontal hoverable">' +
		      	'<div class="card-stacked">' +
		        	'<div class="card-content deep-orange lighten-1 white-text">' +
		          		'<p>Hi, my name is <strong>{{name}}</strong></p>' +
		        	'</div>' +
			        '<div class="card-action">' +
			          	'<a data-show-url="{{url}}" class="about">See more about me</a>' +
			        '</div>' +
			    '</div>' +
	    	'</div>' +
	  	'</div>';

$(document).ready(function(){
	var formatResponse = function(response){
		$("#total").text(response.results.length);
		var personajes = "";
		$.each(response.results, function(i, personaje){
			personajes += template
				.replace("{{name}}", personaje.name)
				.replace("{{url}}", personaje.url);
		});
		$("#people").html(personajes);

		$("#previous").attr("data-url", response.previous);
		if (!response.previous) {
			$("#previous").fadeOut();
		} else{
			$("#previous").fadeIn();
		}
		$("#next").attr("data-url", response.next);
		if (!response.next) {
			$("#next").fadeOut();
		} else{
			$("#next").fadeIn();
		}
	};

	$.getJSON("http://swapi.co/api/people/", formatResponse);
	$("#next").click(function(event){
		event.preventDefault();
		var url = $(this).attr("data-url");
		$.getJSON(url, formatResponse);
	});
	$("#previous").click(function(event){
		event.preventDefault();
		var url = $(this).attr("data-url");
		$.getJSON(url, formatResponse);
	});
	$("#people").on("click", ".about", function(event) {
		event.preventDefault();
		alert("Hola!");
	})
});
