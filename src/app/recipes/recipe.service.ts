import {Recipe} from './recipe.model';
import {EventEmitter, Injectable, Output} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs';

@Injectable()
export class RecipeService {
  recipeSelected = new Subject<Recipe>();
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [];

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes() {
    return [...this.recipes]; // returns exact copy
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  updateRecipe(id: number, value: Recipe) {
    this.recipes[id] = value;
    this.recipesChanged.next(this.getRecipes());
  }

  addRecipe(value: Recipe) {
    this.recipes.push(value);
    this.recipesChanged.next(this.getRecipes());
  }

  delete(id: number) {
    this.recipes.splice(id, 1);
    this.recipesChanged.next(this.getRecipes());
  }

  updateRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.getRecipes());
  }
}
