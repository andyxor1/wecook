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