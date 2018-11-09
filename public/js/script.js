function addInstructionField() {
    var instructionsList = document.getElementsByName('instruction');
    var inputField = `<input type="text" class="mb-2 form-control " name="instruction" placeholder="Instruction ${instructionsList.length + 1}"></input>`;
    document.getElementById("instructionsList").innerHTML += inputField;
}

function addIngredientField() {
    var ingredientsList = document.getElementsByName('ingredient');
    var inputField = `<input type="text" class="mb-2 form-control " name="ingredient" placeholder="Ingredient ${ingredientsList.length + 1}"></input>`;
    document.getElementById('ingredientsList').innerHTML += inputField;
}

function addTag() {
    var tagList = document.getElementsByName('ingredient');
    var tagName = document.getElementById('searchTags').value;
    document.getElementById('searchTags').value = '';
    var newTag = `<input type="checkbox" class="form-check-input" name="tags" value="${tagName}"> <label class="form-check-label" for="${tagName}">${tagName}</label><br>`;
    document.getElementById("tagList").innerHTML += newTag;
}
$(document).ready(function() {

  // get the recipes on the board
  // var recipes = document.getElementById("search_output").innerHTML;
  // var obj = JSON.parse(recipes);
  // console.log(obj)
  // var myVar = <%- JSON.stringify(recipe_seeds) %>;
  // console.log(myVar)
  //
  // console.log("This is recipes");
  // console.log(recipes);
  // let recipe_search = elasticlunr(function () {
  //   this.addField('title');
  //   this.addField('description');
  //   this.addField('tags');
  // });
  //
  // for(var recipe in recipes) {
  //   recipe_title_norm = nlp(recipe.title).normalize().out('text');
  //   recipe_description_norm = nlp(recipe.description).normalize().out('text');
  //   recipe_search_obj =
  //     {
  //       title: recipe_title_norm,
  //       description: recipe_description_norm,
  //       id: recipe._id
  //     };
  //   recipe_search.addDoc(recipe_search_obj);
  // };

  // listens to keyup event when being searched in dashboard
  $('#search_input').on("submit", function() {
    var searchTerms = $("#search_input").val();
    console.log(searchTerms);
    // console.log("Something's being searched");
    // var x = document.getElementById('recipe_result');
    // console.log("This is x")
    // console.log(x)
    // x.empty();
    if ( searchTerms != "" ) {
      console.log(searchTerms);
      $.ajax({
          type: "POST",
          url: "/dashboard",
          data: {"key": searchTerms },
          dataType: "text",
          success: function(data) {
            console.log("Success!")
              // if (data.msg == "available") {
              //     flag = true;
              // }
              // else if (data.msg == "used") {
              //     alert("Email already used, please try a different email.");
              //     $("#email").show().effect("pulsate", { times: 3 }, 1000);
              // }
          },
          error: function(xhr, ajaxOptions, thrownError) {
              console.log(xhr.status);
              console.log(xhr.responseText);
              console.log(thrownError);
              alert("An error occured, please try again.");
          }
      });
    } else { console.log("no search terms");}

  });






});
