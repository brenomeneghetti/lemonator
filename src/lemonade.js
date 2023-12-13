import { CHERRY, HIBISCUS_TEA, HIGHBALL_GLASS, HURRICANE_GLASS, ICE, LEMON, LEMON_SYRUP, LIME, MARGARITA_GLASS, OLD_FASHIONED_GLASS, SLICE_OF_GINGER, SPARKLING_WATER, SPRIG_OF_MINT, SPRIG_OF_ROSEMARY, VODKA } from "./constants.js";




export const ingredients = {
    [LIME]:11,
    [LEMON]:9,
    [CHERRY]:4,
    [SPRIG_OF_MINT]:3,
    [SPRIG_OF_ROSEMARY]:3,
    [SLICE_OF_GINGER]:3,
    [HIBISCUS_TEA]:3,
    [SPARKLING_WATER]:40,
    [VODKA]:3,
    [LEMON_SYRUP]:3,
    [HURRICANE_GLASS]:4,
    [MARGARITA_GLASS]:3,
    [OLD_FASHIONED_GLASS]:4,
    [HIGHBALL_GLASS]:6,
    [ICE]:99
};

export const recipes = [{
    name:'Simple and Sour',
    price:11,
    grade:10,
    ingredients:{
        [LIME]:1,
        [LEMON]:1,
        [SPARKLING_WATER]:8,
        [CHERRY]:1,
        [HIGHBALL_GLASS]:1,
        [ICE]:1
    }
},{
    name:'Lime Shot',
    price:8,
    grade:13,
    ingredients:{
        [LIME]:3,
        [LEMON]:1,
        [SPRIG_OF_ROSEMARY]:1,
        [OLD_FASHIONED_GLASS]:1,
        [ICE]:1
    }
},{
    name:'Power Lemon',
    price:10,
    grade:15,
    ingredients:{
        [LEMON]:3,
        [VODKA]:1,
        [SLICE_OF_GINGER]:1,
        [HIGHBALL_GLASS]:1,
        [ICE]:1
    }
},{
    name:'Sublime',
    price:14,
    grade:11,
    ingredients:{
        [LIME]:2,
        [LEMON]:1,
        [HIBISCUS_TEA]:1,
        [SPRIG_OF_MINT]:1,
        [MARGARITA_GLASS]:1,
        [ICE]:1
    }
},{
    name:'Citric Punch',
    price:13,
    grade:12,
    ingredients:{
        [LIME]:2,
        [SPARKLING_WATER]:8,
        [LEMON_SYRUP]:1,
        [HURRICANE_GLASS]:1,
        [ICE]:1
    }
}];



const useIngredients = (availableIngredients, drinkIngredients)=>{
    return Object.keys(availableIngredients).reduce((remainingIngredients,availableIngredient)=>{
        const drinkIngredient = drinkIngredients[availableIngredient] || 0;
        return {...remainingIngredients,[availableIngredient]: availableIngredients[availableIngredient] - drinkIngredient};
    },{...availableIngredients})
}

const hasMissingIngredients = (availableIngredients, drinkIngredients)=>{
    return Object.keys(drinkIngredients).some(drinkIngredient => !availableIngredients[drinkIngredient] || availableIngredients[drinkIngredient] < drinkIngredients[drinkIngredient]);
}

export const generateDrink = (availableIngredients, listOfAttempts,drinksDone, totalPrice=0, totalGrade=0)=>{
    recipes.forEach(recipe=>{
        const missingIngredients = hasMissingIngredients(availableIngredients,recipe.ingredients);
        if(missingIngredients){
            const {drinksDone: savedDrinks = []} = listOfAttempts[totalPrice][totalGrade] || {};
            if(drinksDone.length > savedDrinks.length){
                listOfAttempts[totalPrice][totalGrade] = {drinksDone,totalPrice, totalGrade, availableIngredients };    
            }
            
        } else {
            generateDrink(useIngredients(availableIngredients,recipe.ingredients),listOfAttempts, [...drinksDone, recipe.name], totalPrice+recipe.price, totalGrade+recipe.grade );
        }
    });
};

export const getBestCombination = (availableIngredients = null)=>{
    let listOfAttempts = Array(100).fill().map(()=>Array(100).fill());
    generateDrink(availableIngredients || ingredients,listOfAttempts,[]);

    let validQuantities = listOfAttempts.reduce((combos, column)=>{
        const lineValues = column.filter(cell=>cell).reduce((lineCombo,cellLine)=>[...lineCombo,cellLine],[]);
        if(!lineValues.length){
            return combos;
        }
        return [...combos,...lineValues];
    },[]);

    return validQuantities[validQuantities.length-1];
}

