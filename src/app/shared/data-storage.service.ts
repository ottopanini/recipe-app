import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Recipe} from '../recipes/recipe.model';
import {RecipeService} from '../recipes/recipe.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  private static readonly RECIPES_STORE = 'https://udang-recipe-book.firebaseio.com/recipes.json';

  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put(DataStorageService.RECIPES_STORE, recipes).subscribe(response => {
      console.log(response);
    });
  }

  fetchRecipes() {
    this.http
      .get<Recipe[]>(DataStorageService.RECIPES_STORE)
      .pipe(map(recipes => {
        return recipes.map(recipe => {
          return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
        });
      }))
      .subscribe(recipes => this.recipeService.updateRecipes(recipes));
  }
}
