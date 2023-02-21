import { Component } from '@angular/core';

import { Item } from '../item.model.class';
import { ItemsComponent } from '../items/items.component';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css']
})
export class ItemFormComponent {

  // constructor(private itemsComponent: ItemsComponent){}

  removalMethods = ['Donated', 'Recycled', 'Sold', 'Trashed'];

  // ID = this.itemsComponent.genId();
  model = new Item('20', 'Dead Plant', 'It lived a short life full of empty watercans',
   0.2, 'Give me your plants if you hate them', this.removalMethods[1]);

  submitted = false;

  onSubmit(): void { this.submitted = true; }

  newItem() {
    this.model = new Item('42', '', '', 9, '', '');
  }
}
