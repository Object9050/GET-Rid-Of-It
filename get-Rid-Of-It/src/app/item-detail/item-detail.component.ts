import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Item } from '../item.model'
import { ItemService } from '../item.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent {
  item?: Item;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private itemService: ItemService
  ) { }

  ngOnInit(): void {
    this.getItem();
  }
  
  getItem(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.itemService.getItem(id)
      .subscribe(itemFromServer => this.item = itemFromServer);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.item) {
      this.itemService.updateItem(this.item)
        .subscribe(() => this.goBack());
    }
  }

}
