// window.alert("hi");
// function addInputField(loc) {
//     switch (loc) {
//         case 'instruction':
           
//             break;
//         case 'ingredient':
//             var inputField = '<input type="text" class="mb-2 form-control " name="ingredients" aria-describedby="emailHelp"></input>';
//             // document.getElementById("ingredientsList").innerHTML += inputField;
//             window.alert(document.getElementById("ingredientsList").innerHTML.length)
//             break;
//     }
// }
function addInstructionField() {
    var instructionsList = document.getElementsByName("instruction");
    var inputField = `<input type="text" class="mb-2 form-control " name="instruction" aria-describedby="emailHelp" placeholder="Instruction ${instructionsList.length + 1}"></input>`;
    document.getElementById("instructionsList").innerHTML += inputField;
}

function addIngredientField() {
    var ingredientsList = document.getElementsByName("ingredient");
    var inputField = `<input type="text" class="mb-2 form-control " name="ingredient" aria-describedby="emailHelp" placeholder="Ingredient ${ingredientsList.length + 1}"></input>`;
    document.getElementById("ingredientsList").innerHTML += inputField;
}