function addInstructionField() {
  var instructionsList = document.getElementsByName('recipe[instructions]');
  var inputField = document.createElement('input');
  document.getElementById("instructionsList").appendChild(inputField);
  inputField.outerHTML = `<input type="text" class="mb-2 form-control " name="recipe[instructions]" placeholder="Instruction ${instructionsList.length + 1}"></input>`;
}

function addIngredientField() {
  var ingredientsList = document.getElementsByName('recipe[ingredients]');
  var inputField = document.createElement('input');
  document.getElementById("ingredientsList").appendChild(inputField);
  inputField.outerHTML = `<input type="text" class="mb-2 form-control " name="recipe[ingredients]" placeholder="Ingredient ${ingredientsList.length + 1}"></input>`;
}

function addTag() {
  var tagName = document.getElementById('searchTags').value;
  var newTag = document.createElement('newTag');
  document.getElementById('tagList').appendChild(newTag);
  newTag.outerHTML = `<input type="checkbox" class="form-check-input" name="recipe[tags]" value="${tagName}"> <label class="form-check-label" for="${tagName}">${tagName}</label><br>`;
  document.getElementById('searchTags').value = '';
}


$(document).ready(function () {
  let userexistsOpened = false;

  var deleteModals = $(".delete_recipe_confirm");
  console.log(deleteModals);
  if(deleteModals && deleteModals.length > 0) {
   for(var i = 0; i < deleteModals.length; i++ ) {
      console.log(deleteModals[i])
      deleteModals[i].addEventListener("keyup", function(e) {
        console.log(e);
        var dModalId =  e.target.id;
        console.log(dModalId);
        var id = dModalId.split('_')[1];
        var hiddenStrInput = "#deleteRecipeHidden_" + id;
        var hiddenStrBtn = "#deleteRecipeBtn_" + id;

        console.log(hiddenStrBtn);

        var valConfirm = $(this).val().toString();
        var valHidden = $(hiddenStrInput).val().toString();

        console.log(valConfirm);
        console.log(valHidden);

        if( valConfirm.toLowerCase() == valHidden.toLowerCase() ) {
          $(hiddenStrBtn).removeClass('disabled');
        } else {
          $(hiddenStrBtn).addClass('disabled');
        }

        $(hiddenStrBtn).on("click", function(e) {
          console.log("clicked");
          $(hiddenStrBtn).submit();
        });
      });
    }
  }

  // $("#deleteRecipeConfirm").on("keyup", function(e) {
  //
  //   var valConfirm = $("#deleteRecipeConfirm").val().toString();
  //   var valHidden = $("#deleteRecipeHidden").val().toString();
  //
  //   console.log(valConfirm);
  //   console.log(valHidden);
  //
  //   if( valConfirm.toLowerCase() == valHidden.toLowerCase() ) {
  //     $("#deleteRecipeBtn").removeClass('disabled');
  //   } else {
  //     $("#deleteRecipeBtn").addClass('disabled');
  //   }
  //
  // });

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

  $("#community_recipes_btn").click(function() {
    console.log("called here")
    $("#home_jumbotron" ).toggle("fold");
  });


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
  //Filter Check the box when clicking the checkbox label
    $(".filter-link").on("click", function () {
        //console.log($(this).prev())
        $(this).prev().trigger("click")
    });

  //Filter Change color when hover
  $(".filter-link").hover(function () {
      //console.log($(this).prev())
      //Hover in
      $(this).css('color', 'orange');
      $(this).css('text-decoration', 'underline');
    },
    function () {
      //Hover out
      $(this).css('color', 'black');
      $(this).css('text-decoration', 'none');
    });


  //Trigger query handler when checkbox are clicked
  $(".filter").on("click", queryHandle);

  //Trigger query handler when hitting enter in search
  $('#search_input').on('keypress', function (e) {
      if(e.which === 13){

          //Disable textbox to prevent multiple submit
          $(this).attr("disabled", "disabled");

          queryHandle();

          //Enable the textbox again if needed.
          $(this).removeAttr("disabled");
      }
  });

  //Handler that scan the checkboxes and send their states to POST

  function tagGenerator(tags) {
    var retStr = '';
    tags.forEach(function (tag) {
      retStr += '<a class="mr-2 mb-2 px-2 tag text-dark">' + tag + '</a>';
    });
    return retStr;
  }

  function ingGenerator(ings) {
      var retStr = '';
      ings.forEach(function (ing) {
          retStr += '<li>' + ing + '</li>';
      });
      return retStr;
  }

  function insGenerator(inss) {
      var retStr = '';
      inss.forEach(function (ins) {
          retStr += '<li>' + ins + '</li>';
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

      //Check if anything was return at all, if not print message

      if (data.length == 0) {
          //console.log(data.length);
          $("#recipe_result").html("Oops, seems like there is no recipe that fits your description, try different tags or key words!!")
      }

      data.forEach(function (d) {

        var tags = tagGenerator(d.tags);
        var ings = ingGenerator(d.ingredients);
        var inss = insGenerator(d.instructions);
        $("#recipe_result").append('<div class="card my-4 recipe_preview border border-warning">' +
          '<div class="card-body p-2">' +
          '<div class="">' + 
          '  <h5 class="card-title text-primary font-weight-bold"><span class="text-uppercase">'+d.title+'</span> <span class="float-right text-dark"> By: <span class="text-info font-italic ">' + d.author_name + '</span> </span></h5>' +
          '  </div>' +
          '    <div class="row">' +
          '      <div class="col-md-4">' +
          '        <a href="#" data-toggle="modal" data-target="#recipe_'+d._id+'"><img class="view_img mb-1 img-fluid align-middle" src="' + d.picture + '" alt="'+ d.title +'" ></a>' +
          '      </div>' +
          '      <div class="col-md-8 p-2">' +
          '        <p class="card-text"><i class="icon mr-2 font-25 fas fa-clock"></i>' + d.cook_time + ' minutes</p>' +
          '        <p class="card-text"><i class="icon mr-2 font-25 fas fa-info-circle"></i>' + d.description + '</p>' +
          '        <div class="d-flex flex-wrap">' +
          '          <i class="icon mr-2 py-1 font-25 fas fa-tags"></i>' +
          '            ' + tags +
          '        </div>' +
          '      </div>' +
          '    </div>' +


          '  </div>' +
          '</div>' +

            '<div class="modal fade" id="recipe_' + d._id + '" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">' +
              '<div class="modal-dialog modal-dialog-centered modal-lg" role="document">' +
              '<div class="modal-content recipe_preview">' +
              '<div class="modal-header">' +
              '<h5 class="modal-title text-warning" id="recipe_' + d.title + '_title">' + d.title + '</h5>' +
              '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
              '<span aria-hidden="true">&times;</span>' +
          '</button>' +
          '</div>' +
          '<div class="modal-body">' +
              '<div class="row">' +
              '<div class="col-sm-4">' +
              '<img class="card-img-top img-fluid" src="' + d.picture + '" alt="' + d.title + '">' +
              '<div class="mt-3">' +
              '<p class="font-italic font-weight-bold"> <i class="icon mr-2 py-1 font-25 fas fa-tags"></i> Tags </p>' +
          '<div class="d-flex flex-wrap">' +
              tags +
      '</div>' +
          '</div>' +
          '</div>' +
          '<div class="col-md-8 card-text">' +
              '<p><span class="font-italic font-weight-bold"><i class="icon mr-2 font-25 far fa-clock"></i> Prep Time:</span> ' + d.prep_time + ' minutes</p>' +
              '<p><span class="font-italic font-weight-bold"><i class="icon mr-2 font-25 fas fa-clock"></i> Cook Time:</span> ' + d.prep_time + ' minutes</p>' +

              '<p class="font-italic font-weight-bold"><i class="icon mr-2 font-25 fas fa-info-circle"></i> Description</p>' +
          '<p class="flex-wrap">' + d.description + '</p>' +

              '<div class="row">' +
              '<div class="col-sm-6 border-right">' +
              '<p class="font-italic font-weight-bold text-center"><i class="icon mr-2 font-25 fas fa-shopping-basket"></i> Ingredients</p>' +
          '<hr>' +
          '<ul>' +
          ings +
      '</ul>' +

          '</div>' +
          '<div class="col-sm-6">' +
              '<p class="font-italic font-weight-bold text-center"><i class="icon mr-2 font-25 fas fa-shoe-prints"></i> Instructions</p>' +
          '<hr>' +
          '<ol>' +
           inss +
      '</ol>' +
          '</div>' +
          '</div>' +


          '</div>' +
          '</div>' +
          '</div>' +
          '<div class="modal-footer">' +
              '<button type="button" class="btn btn-dark" data-dismiss="modal">Close</button>' +
              '</div>' +
              '</div>' +
              '</div>' +
              '</div>'

      );
      });

    })
  }

});
