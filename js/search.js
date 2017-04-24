/*
	Leitar í gegnum öll stök í array og finnur match frá input
*/
function SearchConcerts(input, list){

	var result = []
	for(var i = 0; i < list.length; i++){
		var concert_name = list[i].eventDateName.toLowerCase();
		if(concert_name.indexOf(input.toLowerCase()) >= 0){
			result.push(list[i]);
		}
	}
	LoadEvents(result);
}

/*
    Autocomplete frá materialize
    http://materializecss.com/forms.html#autocomplete
*/
function InitAutocomplete(){
    autocompleteData = {};
    for(var i = 0; i < concert_list.length; i++){
        autocompleteData[concert_list[i].eventDateName] = concert_list[i].imageSource;
    }
    $('#search.autocomplete').autocomplete({
        data: autocompleteData,
        limit: 5,
        onAutocomplete: function(val){
            SearchConcerts(val, concert_list)
        },
        minLength: 1,
    });
}