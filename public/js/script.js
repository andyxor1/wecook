//Trigger quary handler when checkbox are clicked
$(".filter").on("click", queryHandle);

function queryHandle() {
    var pack = [];
    $(".filter").each(function(box){
        var name = $(this).prop("name");
        var value = $(this).prop("checked");
        pack.push({name:name, value:value})
    })
    //Pass this pack to query API when we have one
    console.log(pack);
}
