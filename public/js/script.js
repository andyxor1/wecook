//Trigger quary handler when checkbox are clicked
$(".filter").on("click", queryHandle);

//Handler that scan the checkboxes and send their states to POST
function queryHandle() {
    var pack = [];
    $(".filter").each(function (box) {
        var name = $(this).prop("name");
        var value = $(this).prop("checked");
        pack.push({name: name, value: value})
    })

    //Print the package to console
    console.log(pack);

    //POST call and print the response
    $.post("/find-recipes", pack, function (data, status) {
        console.log(data);
    })
}