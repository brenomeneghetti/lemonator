import { generateDrink, ingredients, recipes } from "./lemonade.js";

let listOfAttempts = Array(100).fill().map(()=>Array(100).fill());
generateDrink(ingredients,listOfAttempts,[]);

let validQuantities = listOfAttempts.reduce((combos, column)=>{
    const lineValues = column.filter(cell=>cell).reduce((lineCombo,cellLine)=>[...lineCombo,cellLine],[]);
    if(!lineValues.length){
        return combos;
    }
    return [...combos,...lineValues];
},[]);


console.table(validQuantities);
const recipesDone = validQuantities[validQuantities.length-1].drinksDone.map(drink=> recipes.find(recipe=>recipe.name === drink));
console.table(recipesDone);
const totalIngredients = recipesDone.reduce((total, recipe)=>({...total,...Object.keys(recipe.ingredients).reduce((totalForRecipe,ingredient)=>({...totalForRecipe,[ingredient]:recipe.ingredients[ingredient] + (total[ingredient] || 0)}),{})}),{});
console.table([...recipesDone.map(recipe=>(recipe.ingredients)),totalIngredients]);
console.table(validQuantities[validQuantities.length-1].availableIngredients)