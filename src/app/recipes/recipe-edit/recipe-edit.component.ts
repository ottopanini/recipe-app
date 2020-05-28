import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {RecipeService} from '../recipe.service';
import {Ingredient} from '../../shared/ingredient.model';

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
        recipe.ingredients.forEach((ingredient) => recipeIngredients.push(this.getIngredientFormGroup(ingredient)));
      }
    }

    this.recipeForm = new FormGroup({
      // tslint:disable-next-line:object-literal-key-quotes
      'name': new FormControl(recipeName, Validators.required),
      // tslint:disable-next-line:object-literal-key-quotes
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      // tslint:disable-next-line:object-literal-key-quotes
      'description': new FormControl(recipeDescription, Validators.required),
      // tslint:disable-next-line:object-literal-key-quotes
      'ingredients': recipeIngredients
    });
  }

  getIngredientFormGroup(ingredient?: Ingredient) {
    let name = '';
    let amount = NaN;

    if (ingredient) {
      name = ingredient.name;
      amount = ingredient.amount;
    }

    return new FormGroup({
      // tslint:disable-next-line:object-literal-key-quotes
      'name': new FormControl(name, Validators.required),
      // tslint:disable-next-line:object-literal-key-quotes
      'amount': new FormControl(amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    });
  }

  onSubmit() {
    if (this.editMode && this.recipeForm.valid) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    }
    else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
  }

  onAddIngredient() {
    (this.recipeForm.get('ingredients') as FormArray).push(this.getIngredientFormGroup());
  }
}
