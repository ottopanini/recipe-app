import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {RecipeService} from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  get ingredientCtrls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = +params.id;
      this.editMode = params.id != null;
      this.initForm();
    });
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    const recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);

      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;

      if (recipe.ingredients) {
        recipe.ingredients.forEach((ingredient) => recipeIngredients.push(new FormGroup({
          // tslint:disable-next-line:object-literal-key-quotes
          'name': new FormControl(ingredient.name),
          // tslint:disable-next-line:object-literal-key-quotes
          'amount': new FormControl(ingredient.amount)
        })));
      }
    }

    this.recipeForm = new FormGroup({
      // tslint:disable-next-line:object-literal-key-quotes
      'name': new FormControl(recipeName),
      // tslint:disable-next-line:object-literal-key-quotes
      'imagePath': new FormControl(recipeImagePath),
      // tslint:disable-next-line:object-literal-key-quotes
      'description': new FormControl(recipeDescription),
      // tslint:disable-next-line:object-literal-key-quotes
      'ingredients': recipeIngredients
    });
  }

  onSubmit() {
    console.log(this.recipeForm);
  }

  onAddIngredient() {
    (this.recipeForm.get('ingredients') as FormArray).push(
      new FormGroup({
        // tslint:disable-next-line:object-literal-key-quotes
        'name': new FormControl(),
        // tslint:disable-next-line:object-literal-key-quotes
        'amount': new FormControl()
      }));
  }
}
