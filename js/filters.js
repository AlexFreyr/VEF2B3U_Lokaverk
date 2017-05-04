function InterpretData(chip, data)
{
    var allChips = $(".chip");
    for(var i = 0; i < allChips.length; i++){
        if(allChips[i] != chip){
            $(allChips[i]).removeClass("selected");
        }
    }
    if($(chip).hasClass("selected")){
        $(chip).removeClass("selected");
        var rawData = ReturnRawData();
        LoadEvents(rawData);
    }else{
        $(chip).addClass("selected");

        if($(chip).is("#az"))
        {
            AlphabeticalOrder(data);
        }
        else if($(chip).is("#za"))
        {
            ReverseAlphabeticalOrder(data);
        }
        else if($(chip).is("#orderDate"))
        {
            OrderFromDate(data);
        }
    }    
}

function AlphabeticalOrder(data)
{
    var result = data;
    // Sort the list alphabetically by eventDateName
    result.sort(function(a, b){
        if(a.eventDateName < b.eventDateName) return -1;
        if(a.eventDateName > b.eventDateName) return 1;
        return 0;
    });
    LoadEvents(result);
}

function ReverseAlphabeticalOrder(data)
{
    var result = data;
    // Sort the list alphabetically by eventDateName
    result.sort(function(a, b){
        if(a.eventDateName < b.eventDateName) return 1;
        if(a.eventDateName > b.eventDateName) return -1;
        return 0;
    });
    LoadEvents(result);
}

function OrderFromDate(data)
{
    LoadData(data);
}