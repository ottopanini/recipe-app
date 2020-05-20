import {Ingredient} from '../shared/ingredient.model';

export class ShoppingListService {
  private mIngredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  get ingredients(): Ingredient[] {
    return this.mIngredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }
}
