import {Ingredient} from '../shared/ingredient.model';
import {EventEmitter} from '@angular/core';
import {Subject} from 'rxjs';

export class ShoppingListService {
  ingredientsChanged = new EventEmitter<Ingredient[]>();
  startedEditing: Subject<number> = new Subject<number>();

  private mIngredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  get ingredients(): Ingredient[] {
    return this.mIngredients.slice();
  }

  addIngredients(ingredients: Ingredient[]) {
    this.mIngredients = [...this.mIngredients, ...ingredients];
    this.ingredientsChanged.emit([...this.mIngredients]);
  }

  addIngredient(newIngredient: Ingredient) {
    this.addIngredients([newIngredient]);
  }

  getIngredient(index: number) {
    return this.mIngredients[index];
  }
}
