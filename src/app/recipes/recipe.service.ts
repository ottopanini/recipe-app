import {Recipe} from './recipe.model';

export class RecipeService {
  private recipes: Recipe[] = [new Recipe('A Test Recipe', 'this is a test', 'https://i.ytimg.com/vi/onCfFc8FNr8/maxresdefault.jpg'),
    new Recipe('Another Test Recipe', 'this is a test', 'https://i.ytimg.com/vi/onCfFc8FNr8/maxresdefault.jpg')];

  getRecipes() {
    return this.recipes.slice(); // returns exact copy
  }


}
