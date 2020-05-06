import {Component, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  collapsed = true;

  modules = Module;

  @Output()
  choseShopping = new EventEmitter<Module>();

  onMenuSelect(module: Module) {
    this.choseShopping.emit(module);
  }
}

export enum Module {
  RECIPES,
  SHOPPING
}
