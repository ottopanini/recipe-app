import {Component} from '@angular/core';
import {DataStorageService} from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  collapsed = true;

  constructor(private dataStorageService: DataStorageService) {
  }

  onSaveDate() {
    this.dataStorageService.storeRecipes();
  }
}

export enum Module {
  RECIPES,
  SHOPPING
}
