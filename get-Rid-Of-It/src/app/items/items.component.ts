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

  getItems(): void {
    this.itemService.getItems()
      .subscribe(itemsFromServer => this.items = itemsFromServer);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    const id = this.genId(this.items);
    this.itemService.addItem({ id, name } as Item)
    .subscribe(newItem => {
      this.items.push(newItem);
    });
  }

  /** Generate an ID for each new Item */
  genId(items: Item[]): string {
    return items.length > 0 ? (Math.max(...items.map(item => +item.id)) + 1).toString() : '1';
}

  /** OLD-AS-NUMBER // Generate an ID for each new Item */
    // genId(items: Item[]): number {
    //   return items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 1;
    // }

  /** deleteItems subscribes to the DELETE request of ItemService */
  deleteItem(item: Item): void {
    this.itemService.deleteItem(item.id)
      .subscribe(() => {
        this.getItems();
    });
}
}
