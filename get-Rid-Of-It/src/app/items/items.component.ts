import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { Item } from '../item.model';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  items: Item[] = [];
  
  /** takes an instance of the ItemService as a parameter and assigns it to a 
   * private property of the class. It's used for dependency injection in Angular. */
  constructor(private itemService: ItemService) { }

  /** Calls getItems() when component has been initialized
   * (ngOnInit-lifecycle hook) */  
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

  /** Subscribes to the DELETE request of ItemService */
  deleteItem(item: Item): void {
    this.itemService.deleteItem(item.id)
      .subscribe(() => {
        this.getItems();
      });
  }
}
