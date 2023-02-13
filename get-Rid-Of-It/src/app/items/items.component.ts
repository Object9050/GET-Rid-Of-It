import { Component, OnInit } from '@angular/core';
// import { Item } from '../item';
import { ItemService } from '../item.service';
import { Item } from '../item.model';

// import { ITEMS } from '../mock-items';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  items: Item[] = [];
  newItem: any = {};

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.getItems();
  }

  getItems(): void {
    this.itemService.getItems()
      .subscribe(items => this.items = items);
  }

  addNewItem() {
    this.itemService.addItem(this.newItem);
  }

  deleteItem(item: Item): void {
    this.itemService.deleteItem(item.id)/* .subscribe(() => {
      this.items = this.items.filter(i => i !== item);
    }); */
  }
  
}
