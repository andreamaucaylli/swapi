var template = '<div class="col s12 m4">' + 
					'<div class="card horizontal hoverable">' +							
		      			'<div class="card-stacked">' +
		        			'<div class="card-content amber white-text">' +
		          				'<p>Hi, my name is <strong>{{name}}</strong></p>' +
		        			'</div>' +
		        			'<div class="card-action">' +
		          				'<a data-show-url="{{url}}" class="about">See more about me</a>' +
		        			'</div>' +
		      			'</div>' +
		    		'</div>' +
				'</div>';

var templateSpecies = '<div class="col s12 m4">' + 
					'<div class="card horizontal hoverable">' +							
		      			'<div class="card-stacked">' +
		        			'<div class="card-content amber white-text">' +
		          				'<p>Hi, my name is <strong>{{name}}</strong></p>' +
		        			'</div>' +
		        			'<div class="card-action">' +
		          				'<a data-show-url="{{url}}" class="about">See more about me</a>' +
		        			'</div>' +
		      			'</div>' +
		    		'</div>' +
				'</div>';


var templateSearcher = '<option value="__value__">__option__</option>';

var mostrarPersonajes = function (response) {
	$("#total").text(response.results.length);
	var personajes = "";
	$.each(response.results, function (i, personaje) {
		personajes += template
		.replace("{{name}}", personaje.name)
		.replace("{{url}}", personaje.url);
	});
	$("#people").html(personajes);
	$("#next").attr("data-url", response.next);
	$("#previous").attr("data-url", response.previous);

	if (!response.next) {
		$("#next").fadeOut();
	};	
	if (!response.previous) {
		$("#previous").fadeOut();
	};
	if (response.next && response.previous) {
		$("#next").fadeIn();
		$("#previous").fadeIn();
	};
};

var mostrarOpciones = function (response) {
	var option1 = "";
	$.each(response.results, function (i, option) {
		var value = "";
		var urlSpecies = "http://swapi.co/api/people/";
		$.each(option.people, function (i, valor) {
			value += valor.replace( urlSpecies, "");
		});
		option1 += templateSearcher
		.replace("__option__", option.name)
		.replace("__value__", value.substring(0, value.length-1));
	});
	$("#species").html('<option value="" disabled selected>Choose your option</option>'+ option1);	
};

$(document).ready( function () {

	$.getJSON("http://swapi.co/api/people/", mostrarPersonajes);
	$.getJSON("http://swapi.co/api/species/", mostrarOpciones);

	$("#next").click( function (e) {
		e.preventDefault();
		var url = $(this).attr("data-url");
		$.getJSON(url, mostrarPersonajes);
	});

	$("#previous").click( function (e) {
		e.preventDefault();
		var url = $(this).attr("data-url");
		$.getJSON(url, mostrarPersonajes);
	});

	$("#people").on("click", ".about", function (e) {
		e.preventDefault();
		alert("Hola!");
	});

	$(".container").on("change", "#species", function(e) {
		var url = $(this).val().split("/"); /*con esto tengo mi array*/
		for (var i = 0; i < url.length; i++) {
			$.getJSON("http://swapi.co/api/people/" + url[i] + "/", function (response) {
				var characterSpecies = templateSpecies.replace("{{name}}", response.name);
				$("#resultsSearch").append(characterSpecies);
			});

		}
	});

});		