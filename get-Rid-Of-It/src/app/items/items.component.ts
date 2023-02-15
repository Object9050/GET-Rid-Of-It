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
  @Input() selectedItem?: any;

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
    this.itemService.deleteItem(item.id)
      .subscribe(() => {
        this.items = this.items.filter(i => i !== item);
    });
  }
  
  updateItem(item: Item): void {
    this.selectedItem = item;
    const updatedItem: Item = {
      id: this.selectedItem.id,
      name: this.selectedItem.name,
      age: this.selectedItem.age,
      comments: this.selectedItem.comments,
      reasonForRemoval: '',
      photoUrl: '',
      dateRemoved: new Date
      // removalMethod: Donated
    };
  
    this.itemService.editItem(updatedItem)
      .subscribe(() => {
        this.getItems();
      });
  }

  clearSelection() {
    this.selectedItem = null;
  }
}
