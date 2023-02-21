import { Component } from '@angular/core';

import { ItemClass } from '../item.model.class';
import { Item, RemovalMethod } from '../item.model'
import { ItemService } from '../item.service';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css']
})

export class ItemFormComponent {
  items: Item[]= []

  constructor(private itemService: ItemService) { }

  removalMethods = ['Donated', 'Recycled', 'Sold', 'Trashed'];
  model = new ItemClass('', 'Dead Plant', 'It lived a short life full of empty watercans',
   0.2, 'Give me your plants if you hate them', this.removalMethods[1]);

  removalMethods2 = Object.values(RemovalMethod);
  model2: Item = {
    id: '',
    name: '',
    reasonForRemoval: '',
    age: 0,
    comments: '',
    removalMethod: RemovalMethod.Trashed
  }

  // submitted = false;

    /** Calls getItems() when component has been initialized
   * (So called ngOnInit-lifecycle hook) */  
  ngOnInit(): void {
    this.getItems();
  }

  /** Retrieves the items from the server by calling the 
   * getItems method of the itemService. The items returned 
   * by the server are then assigned to the items property 
   * of the component. */
  getItems(): void {
    this.itemService.getItems()
      .subscribe(itemsFromServer => this.items = itemsFromServer);
  }

  onSubmit() {
    // this.submitted = true;
    this.model2.id = this.itemService.genId(this.items)
    this.itemService.addItem(this.model2)
      .subscribe(item => {this.items.push(item)});
  }
  
  // newItem() {
  //   this.model = new ItemClass('', '', '', 0, '', '');
  // }

  // newItem2() {
  //   this.model2 = {
  //     id: '',
  //     name: '',
  //     reasonForRemoval: '',
  //     age: 0,
  //     comments: '',
  //     removalMethod: RemovalMethod.Trashed
  //   }
  // };
}
