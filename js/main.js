/*
    Alexander Freyr Lúðvíksson
    2017
*/
function Concert(eventDateName, name, dateOfShow, userGroupName, eventHallName, imageSource){
    this.eventDateName = eventDateName;
    this.name = name;
    this.dateOfShow = dateOfShow;
    this.userGroupName = userGroupName;
    this.eventHallName = eventHallName;
    this.imageSource = imageSource;
}

$(document).ready(function(){
    //Nær í JSON object frá apis.is um tónleika á næstunni
    $.ajax({
        url: "http://apis.is/concerts",
        type: "GET",
        success : function(response){
            // Geymir upplýsingarnar í array
            var concert_list = [];

            result = response.results;
            for(var i = 0; i < result.length; i++){
                concert_list.push(new Concert(
                    result[i].eventDateName,
                    result[i].name,
                    result[i].dateOfShow,
                    result[i].userGroupName,
                    result[i].eventHallName,
                    result[i].imageSource
                ));
            }

            $("#preloader-remove").remove();
            LoadEvents(concert_list);
        },
        failure : function(response){
            $("#preloader-remove").remove();
            $("#content-wrap").append("<p class='flow-text'>Eitthvað fór úrskeðis með að ná í upplýsingarnar</p>");
        }
    });
});

/*
    Notar upplýsingarnar frá AJAX kallinu til að birta það sem á að
    koma fram á síðunni
*/
function LoadEvents(list){
    console.log(list);
    for(var i = 0; i < list.length; i++){
        /*
            Ef titill er of langur stækka spjöldin of langt niður og
            eyðileggja flowið á síðunni
        */
        var title = list[i].eventDateName;
        if(list[i].eventDateName.length >= 20){
            title = list[i].eventDateName.substr(0, 19) + "...";
        }

        $("#content-wrap").append(" \
            <div class='col s12 m6'> \
                <div class='card hoverable'> \
                    <div class='card-image waves-effect waves-block waves-light'> \
                        <img class='activator' src='" + list[i].imageSource + "'> \
                    </div> \
                    <div class='card-content'> \
                        <span class='card-title activator grey-text text-darken-4 truncate'>" + title + "<i class='material-icons right'>more_vert</i></span> \
                        <p><a href='#'>Meiri upplýsingar</a></p> \
                    </div> \
                    <div class='card-reveal'> \
                        <span class='card-title grey-text text-darken-4'>" + list[i].eventDateName + "<i class='material-icons right'>close</i></span>\
                        <p>Hello world</p>\
                    </div>\
                </div> \
            </div>");
    }

    $("#content-wrap").masonry({
        itemSelector: '.col',
    });
}