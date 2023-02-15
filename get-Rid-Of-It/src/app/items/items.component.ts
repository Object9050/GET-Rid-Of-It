import { Component, OnInit, Input } from '@angular/core';
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
  selectedItem?: Item;

  constructor(private itemService: ItemService) { }

  onSelect(item: Item): void {
    this.selectedItem = item;
  }

  ngOnInit(): void {
    this.getItems();
  }

  getItems(): void {
    this.itemService.getItems()
      .subscribe(itemsFromServer => this.items = itemsFromServer);
  }

  addNewItem() {
    this.itemService.addItem(this.newItem);
  }

  deleteItem(item: Item): void {
    this.itemService.deleteItem(item.id)
      .subscribe(() => {
        this.items = this.items.filter(i => i !== item);
    });
  }
  
  updateItem(item: Item): void {
    this.selectedItem = item;
    this.itemService.editItem(item).subscribe({
      next: updatedItem => {
        this.items = this.items.map(i => i.id === updatedItem.id ? updatedItem : i);
      },
      error: err => {
        console.error('An error occurred: ', err);
      },
      complete: () => {
        console.log('Edit item completed.');
      }
    });
  }
  
  // clearSelection() {
  //   this.selectedItem = null;
  // }
}
