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

//Upplýsingar frá AJAX verða geymdar hér
concert_list = [];

/*
    Tekur inn tölu á milli 1 og 12 og skilar út mánuð
*/
function ChangeMonthDate(month)
{
    var month = parseInt(month);
    var return_month = null;
    if(month === 1)
        return_month = "janúar";
    else if(month === 2)
        return_month = "febrúar";
    else if(month === 3)
        return_month = "mars";
    else if(month === 4)
        return_month = "apríl";
    else if(month === 5)
        return_month = "maí";
    else if(month === 6)
        return_month = "júní";
    else if(month === 7)
        return_month = "júlí";
    else if(month === 8)
        return_month = "ágúst";
    else if(month === 9)
        return_month = "september";
    else if(month === 10)
        return_month = "október";
    else if(month === 11)
        return_month = "nóvember";
    else if(month === 12)
        return_month = "desember";
    return return_month;
}

function PrepareDate(date, type)
{
    var return_string;
    var split_date = date.split("T");

    if(type === "date")
    {
        var temp_split = split_date[0].split("-");
        return_string = temp_split[2] + "." + ChangeMonthDate(temp_split[1]) + " " + temp_split[0];
    }
    else if(type === "time")
    {
        var temp_split = split_date[1].split(":");
        return_string = temp_split[0] + ":" + temp_split[1];
    }

    return return_string;
}

/*
    Notar upplýsingarnar frá AJAX kallinu til að birta það sem á að
    koma fram á síðunni
*/
function LoadEvents(list){
    $("#content-wrap").empty();
    for(var i = 0; i < list.length; i++){
        /*
            Ef titill er of langur stækka spjöldin of langt niður og
            eyðileggja flowið á síðunni
        */
        var title = list[i].eventDateName;
        if(list[i].eventDateName.length >= 20){
            title = list[i].eventDateName.substr(0, 19) + "...";
        }

        var specificDate = PrepareDate(list[i].dateOfShow, "date");
        var specificTime = PrepareDate(list[i].dateOfShow, "time");

        $("#content-wrap").append(" \
            <div class='col s12 m6'> \
                <div class='card hoverable'> \
                    <div class='card-image waves-effect waves-block waves-light'> \
                        <img class='activator' src='" + list[i].imageSource + "'> \
                    </div> \
                    <div class='card-content'> \
                        <span class='card-title activator grey-text text-darken-4 truncate'>" + title + "<i class='material-icons right'>more_vert</i></span> \
                    </div> \
                    <div class='card-reveal'> \
                        <span class='card-title grey-text text-darken-4'>" + list[i].eventDateName + "<i class='material-icons right'>close</i></span>\
                        <p>" + "<strong>" + "Nafn sýningar: " + "</strong>" + list[i].name +"</p>\
                        <p>" + "<strong>" + "Staðsetning: " + "</strong>" + list[i].eventHallName + "</p>\
                        <p>" + "<strong>" + "Dagsetning: " + "</strong>" + specificDate + "</p>\
                        <p>" + "<strong>" + "Kl: " + "</strong>" + specificTime + "</p>\
                    </div>\
                </div> \
            </div>");
    }
}

function LoadData()
{
    concert_list = [];
     //Nær í JSON object frá apis.is um tónleika á næstunni
    $.ajax({
        url: "http://apis.is/concerts",
        type: "GET",
        success : function(response){
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
            InitAutocomplete();
            console.log(concert_list);
        },
        failure : function(response){
            $("#preloader-remove").remove();
            $("#content-wrap").append("<p class='flow-text'>Eftirfarandi villumelding kom við það að reyna ná í upplýsingarnar: " + response + "</p>");
        }
    });
}

$(document).ready(function(){
    LoadData();
});

/*
    Event handlers
*/

// Ef ýtt er á 'ENTER'
$("#search").keypress(function(e){
    if(e.which == 13){
        var u_input = $("#search").val();
        SearchConcerts(u_input, concert_list);
    }
});

// Ef ýtt er á 'leita' takkann
$("#searchButton").on("click", function(){
    var u_input = $("#search").val();
    SearchConcerts(u_input, concert_list);
});

// Ef ýtt er á filter takkana
$(".chip").on("click", function(){
    InterpretData(this, concert_list);
});