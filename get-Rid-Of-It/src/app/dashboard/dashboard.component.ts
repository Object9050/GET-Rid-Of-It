import { Component, OnInit } from '@angular/core';
import { Item } from '../item.model';
import { ItemService } from '../item.service';
import * as quotes from '../quotes.json';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  items: Item[] = [];
  quotes: any[] = quotes;
  randomIndex: number = Math.floor(Math.random() * this.quotes.length);

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.getItems();
  }

  /** Get items from server and slice the list from the end -4 to
   * show the last 4 items (the latest Liberators) in the list. 
   */
  getItems(): void {
    this.itemService.getItems()
      .subscribe(itemsFromServer => this.items = itemsFromServer.slice(-4));
  }
}