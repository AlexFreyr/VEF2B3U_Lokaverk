function Concert(eventDateName, name, dateOfShow, userGroupName, eventHallName, imageSource){
    this.eventDateName = eventDateName;
    this.name = name;
    this.dateOfShow = dateOfShow;
    this.userGroupName = userGroupName;
    this.eventHallName = eventHallName;
    this.imageSource = imageSource;
}

$(document).ready(function(){
    $.ajax({
        url: "http://apis.is/concerts",
        type: "GET",
        success : function(response){
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

            LoadEvents(concert_list)
        },
        failure : function(response){

        }
    });
});

function LoadEvents(list){
    console.log(list);
    for(var i = 0; i < list.length; i++){
        $("#content-wrap").append(" \
            <div class='col s12 m6 l4'> \
                <div class='card'> \
                    <div class='card-image waves-effect waves-block waves-light'> \
                        <img class='activator' src='" + list[i].imageSource + "'> \
                    </div> \
                    <div class='card-content'> \
                        <span class='card-title activator grey-text text-darken-4'>" + list[i].eventDateName + "<i class='material-icons right'>more_vert</i></span> \
                        <p><a href='#'>Meiri upplýsingar</a></p> \
                    </div> \
                    <div class='card-reveal'> \
                        <span class='card-title grey-text text-darken-4'>" + list[i].eventDateName + "<i class='material-icons right'>close</i></span>\
                        <p>Hello world</p>\
                    </div>\
                </div> \
            </div>");
    }

}