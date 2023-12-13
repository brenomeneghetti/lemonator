import { CHERRY, HIGHBALL_GLASS, ICE, LEMON, LIME, OLD_FASHIONED_GLASS, SLICE_OF_GINGER, SPARKLING_WATER, SPRIG_OF_ROSEMARY, VODKA } from '../constants';
import { getBestCombination, recipes } from '../lemonade';


describe('Doing lemonade!', () => {

    test('Should be OK', () => {
        expect(true).toEqual(true);
      });

      test('Test Recipes', () => {
        
    expect(getBestCombination(recipes[0].ingredients).drinksDone).toEqual([recipes[0].name]);
    expect(getBestCombination(recipes[1].ingredients).drinksDone).toEqual([recipes[1].name]);
    expect(getBestCombination(recipes[2].ingredients).drinksDone).toEqual([recipes[2].name]);
    expect(getBestCombination(recipes[3].ingredients).drinksDone).toEqual([recipes[3].name]);
    expect(getBestCombination(recipes[4].ingredients).drinksDone).toEqual([recipes[4].name]);

      });

      test('Test multiple Simple and Sour', () => {
        const availableIngredients = {
          [LIME]:3,
          [LEMON]:3,
          [SPARKLING_WATER]:24,
          [CHERRY]:3,
          [HIGHBALL_GLASS]:3,
          [ICE]:3
      }
        
    expect(getBestCombination(availableIngredients).drinksDone).toEqual(["Simple and Sour","Simple and Sour","Simple and Sour"]);

      });

      test('Test multiple Lime Shot', () => {
        const availableIngredients = {
          [LIME]:9,
          [LEMON]:3,
          [SPRIG_OF_ROSEMARY]:3,
          [OLD_FASHIONED_GLASS]:3,
          [ICE]:3
      }
        
    expect(getBestCombination(availableIngredients).drinksDone).toEqual(["Lime Shot","Lime Shot","Lime Shot"]);

      });

      test('Test multiple Power Lemon', () => {
        const availableIngredients = {
          [LEMON]:9,
          [VODKA]:3,
          [SLICE_OF_GINGER]:3,
          [HIGHBALL_GLASS]:3,
          [ICE]:3
      }
        
    expect(getBestCombination(availableIngredients).drinksDone).toEqual(["Power Lemon","Power Lemon","Power Lemon"]);

      });

      test('Test one Power Lemon and one Lime Shot', () => {
        const availableIngredients = {
          [LIME]:3,
          [LEMON]:4,
          [SPRIG_OF_ROSEMARY]:1,
          [OLD_FASHIONED_GLASS]:1,
          [VODKA]:1,
          [SLICE_OF_GINGER]:1,
          [HIGHBALL_GLASS]:1,
          [ICE]:2
      }
        
    expect(getBestCombination(availableIngredients).drinksDone).toEqual(["Lime Shot","Power Lemon"]);

      });

})