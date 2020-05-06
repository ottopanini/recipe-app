import { Component } from '@angular/core';
import {Module} from './header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'recipe-app';
  selectedMenu = Module.RECIPES;

  module = Module;

  onShoppingChosen(module: Module) {
    this.selectedMenu = module;
  }
}
