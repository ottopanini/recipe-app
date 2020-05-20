import {Ingredient} from '../shared/ingredient.model';
import {EventEmitter} from '@angular/core';
import {markAsyncChunksNonInitial} from '@angular-devkit/build-angular/src/angular-cli-files/utilities/async-chunks';

export class ShoppingListService {
  ingredientsChanged = new EventEmitter<Ingredient[]>();

  private mIngredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  get ingredients(): Ingredient[] {
    return this.mIngredients.slice();
  }

  addIngredient(ingredients: Ingredient[]) {
    this.mIngredients = [...this.mIngredients, ...ingredients];
    this.ingredientsChanged.emit([...this.mIngredients]);
  }
}
