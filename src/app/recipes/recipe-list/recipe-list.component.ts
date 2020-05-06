import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Recipe} from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [new Recipe('A Test Recipe', 'this is a test', 'https://i.ytimg.com/vi/onCfFc8FNr8/maxresdefault.jpg'),
    new Recipe('Another Test Recipe', 'this is a test', 'https://i.ytimg.com/vi/onCfFc8FNr8/maxresdefault.jpg')];

  @Output()
  recipeSelectedEmitter = new EventEmitter<Recipe>();

  constructor() { }

  ngOnInit(): void {
  }

  onRecipeSelected(recipe: Recipe) {
    this.recipeSelectedEmitter.emit(recipe);
  }
}
