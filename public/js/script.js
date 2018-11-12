function addInstructionField() {
  var instructionsList = document.getElementsByName('instructions');
  var inputField = document.createElement('input');
  document.getElementById("instructionsList").appendChild(inputField);
  inputField.outerHTML = `<input type="text" class="mb-2 form-control " name="instructions" placeholder="Instruction ${instructionsList.length + 1}"></input>`;
}

function addIngredientField() {
  var ingredientsList = document.getElementsByName('ingredients');
  var inputField = document.createElement('input');
  document.getElementById("ingredientsList").appendChild(inputField);
  inputField.outerHTML = `<input type="text" class="mb-2 form-control " name="ingredients" placeholder="Ingredient ${ingredientsList.length + 1}"></input>`;
}

function addTag() {
  var tagName = document.getElementById('searchTags').value;
  var newTag = document.createElement('newTag');
  document.getElementById('tagList').appendChild(newTag);
  newTag.outerHTML = `<input type="checkbox" class="form-check-input" name="tags" value="${tagName}"> <label class="form-check-label" for="${tagName}">${tagName}</label><br>`;
  document.getElementById('searchTags').value = '';
}


$(document).ready(function () {
  let userexistsOpened = false;

  $("#signupUsername").on("change", function () {
    console.log("cajsdlkfjasdlkfj;asdlkfj");
    var data = {};
    data.username = $("#signupUsername").val()
    if ($("#signupUsername").val() != "") {
      $.ajax({
        type: "POST",
        url: "/signup/check_user",
        data: data,
        datatype: "json",
        success: function (returns) {
          if (returns.msg == "used") {
            console.log(returns);
            $('.account-message.userexists').addClass("alert-warning").slideDown(300).removeClass("d-none");
            userexistsOpened = true;
            $("#signupButton").attr("disabled", true);
          } else if (returns.msg == "available") {
            $('.account-message.userexists').slideUp(300);
            userexistsOpened = false;
            $("#signupButton").attr("disabled", false);
          }
        },
        error: function (xhr, ajaxOptions, errThrown) {
          console.log(xhr.status);
          console.log(xhr.responseText);
          console.log(errThrown);
          alert("An error occured, please try again.");
        }

      });
    }
  });
  /* checks if username and usernameConfirm are the same */
  $("#signupUsernameConfirm, #signupUsername").on('keyup', function () {
    var username = $('#signupUsername').val();
    var usernameConfirm = $('#signupUsernameConfirm').val();
    if (username != "" && usernameConfirm != "") {
      console.log(username);
      console.log(usernameConfirm);
      if (username === usernameConfirm) {
        $('.account-message.username').slideUp(300);
      } else {
        $('.account-message.username').addClass("alert-warning").slideDown(300).removeClass("d-none");
      }
    }
  });

  /* checks if password and passwordConfirm are the same */
  $("#signupPassword, #signupPasswordConfirm").on('keyup', function () {
    var password = $('#signupPassword').val();
    var passwordConfirm = $('#signupPasswordConfirm').val();
    if (password != "" && passwordConfirm != "") {
      if (password === passwordConfirm) {
        $('.account-message.password').slideUp(300);
      } else {
        $('.account-message.password').addClass("alert-warning").slideDown(300).removeClass("d-none");
      }
    }
  });

  /* checks if the create account fields are all filled up and equal */
  $("#signupUsername, #signupUsernameConfirm, #signupPassword, #signupPasswordConfirm").on('keyup', function () {
    var username = $('#signupUsername').val();
    var usernameConfirm = $('#signupUsernameConfirm').val();
    var password = $('#signupPassword').val();
    var passwordConfirm = $('#signupPasswordConfirm').val();
    if (username !== "" && usernameConfirm !== "" &&
      password !== "" && passwordConfirm !== "" &&
      username == usernameConfirm && password == passwordConfirm) {

      $("#signupButton").attr("disabled", false);
      if (userexistsOpened) {
        $("#signupButton").attr("disabled", true);
      }

    } else {
      $("#signupButton").attr("disabled", true);
    }

  });
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
  // $('#view_recipe_btn').on("click", function() {
  //   var link = $(this).attr('href');
  //
  //   $(location).attr('href', location.origin + link);
  //
  // })


  $('#search_button').on("click", queryHandle);
  // var searchTerms = $("#search_input").val();
  // console.log(searchTerms);
  // // console.log("Something's being searched");
  // // var x = document.getElementById('recipe_result');
  // // console.log("This is x")
  // // console.log(x)
  // // x.empty();
  // if ( searchTerms != "" ) {
  //   console.log(searchTerms);
  //   $.ajax({
  //       type: "POST",
  //       url: "/dashboard",
  //       data: {"key": searchTerms },
  //       dataType: "text",
  //       success: function(data) {
  //         console.log("Success!")
  //           // if (data.msg == "available") {
  //           //     flag = true;
  //           // }
  //           // else if (data.msg == "used") {
  //           //     alert("username already used, please try a different username.");
  //           //     $("#username").show().effect("pulsate", { times: 3 }, 1000);
  //           // }
  //       },
  //       error: function(xhr, ajaxOptions, thrownError) {
  //           console.log(xhr.status);
  //           console.log(xhr.responseText);
  //           console.log(thrownError);
  //           alert("An error occured, please try again.");
  //       }
  //   });
  // } else { console.log("no search terms");}

  //});

  //Trigger quary handler when checkbox are clicked
  $(".filter").on("click", queryHandle);

  //Handler that scan the checkboxes and send their states to POST

  function tagGenerator(tags) {
    var retStr = '';
    tags.forEach(function (tag) {
      retStr += '<a href="#" class="mr-2 mb-2 px-2 tag text-dark">' + tag + '</a>';
    });
    return retStr;
  }

  function queryHandle() {
    var pack = [];
    var searchTerms = $("#search_input").val();
    pack.push({ name: "search", value: searchTerms });




    $(".filter").each(function (box) {
      var name = $(this).prop("name");
      var value = $(this).prop("checked");
      pack.push({ name: name, value: value })
    })



    //Print the package to console
    console.log(pack);

    //POST call and print the response
    $.post("/dashboard", pack, function (data, status) {
      console.log(data);
      $("#recipe_result").empty();
      data.forEach(function (d) {

        var tags = tagGenerator(d.tags);
        $("#recipe_result").append('<div class="card my-4 recipe_preview">' +
          '<div class="card-header bg-warning">' +
          '  <h3 class="text-dark text-uppercase font-weight-bold">' + d.title + '</h3>' +
          '  </div>' +
          '  <div class="card-body">' +
          '    <div class="row">' +
          '      <div class="col-md-4">' +
          '        <img class="recipe_preview mb-3" src="' + d.picture + '" alt="TODO" >' +
          '        <a href="/recipe/' + d._id + '" class="btn btn-block btn-outline-danger btn-lg float- mt-2 mb-2"> <i class="fas fa-laugh-beam"></i> View Recipe</a>' +
          '      </div>' +
          '      <div class="col-md-8">' +
          '        <p class="card-text"><i class="icon mr-2 font-25 fas fa-clock"></i>' + d.cook_time + ' minutes</p>' +
          '        <p class="card-text"><i class="icon mr-2 font-25 fas fa-info-circle"></i>' + d.description + '</p>' +
          '        <div class="d-flex flex-wrap">' +
          '          <i class="icon mr-2 py-1 font-25 fas fa-tags"></i>' +
          '            ' + tags +
          '        </div>' +
          '      </div>' +
          '    </div>' +


          '  </div>' +
          '</div>'

        );
      });

    })
  }






});
