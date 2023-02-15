import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { Item } from '../item.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  items: Item[] = [];
  newItem: any = {};
  selectedItem?: Item;

  constructor(private itemService: ItemService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.getItems();
  }

  onSelect(item: Item): void {
    this.selectedItem = item;
    this.messageService.add(`ItemsComponent: Selected item id: ${item.id}`);
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
}
