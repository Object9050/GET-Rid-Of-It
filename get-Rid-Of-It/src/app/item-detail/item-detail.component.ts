import { Component, Input } from '@angular/core';
import { Item } from '../item.model'

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent {
  @Input() item?: Item;
}
