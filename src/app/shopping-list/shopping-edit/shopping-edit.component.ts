import {Component, OnDestroy, OnInit} from '@angular/core';
import {ShoppingListService} from '../shopping-list.service';
import {NgForm} from '@angular/forms';
import {Ingredient} from '../../shared/ingredient.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  editMode = false;
  editingItemIndex: number;

  name = '';
  amount = NaN;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing.subscribe(index => {
      this.editingItemIndex = index;
      this.editMode = true;
    });
  }

  onAddItem(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    this.shoppingListService.addIngredient(newIngredient);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
