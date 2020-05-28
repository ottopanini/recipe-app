import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
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
              private recipeService: RecipeService,
              private router: Router) { }

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
    if (this.recipeForm.valid) {
      const nextId = this.editMode ? this.id : this.recipeService.getRecipes().length;

      if (this.editMode) {
        this.recipeService.updateRecipe(this.id, this.recipeForm.value);
      }
      else {
        this.recipeService.addRecipe(this.recipeForm.value);
      }

      this.editMode = false;
      this.router.navigate(['recipes', nextId]);
    }
  }

  onAddIngredient() {
    (this.recipeForm.get('ingredients') as FormArray).push(this.getIngredientFormGroup());
  }

  onCancel() {
    if (this.editMode) {
      this.router.navigate(['recipes', this.id]);
    }
    else {
      this.router.navigate(['recipes']);
    }
  }

  onDelete() {
    this.recipeService.delete(this.id);
    this.router.navigate(['recipes']);
  }

  onRemoveIngredient(index: number) {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }
}
