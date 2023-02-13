import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from './item.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
}) 
export class ItemService {
  private itemsUrl = 'http://localhost:3000/api/items';

  constructor(private http: HttpClient) { }

  getItems() {
    return this.http.get<Item[]>(this.itemsUrl);
  }

  addItem(item: any) {
    this.http.post(this.itemsUrl, item).subscribe(() => {
      this.getItems();
    });
  }

  updateItem(item: any) {
    this.http.put(`${this.itemsUrl}/${item.id}`, item).subscribe(() => {
      this.getItems();
    });
  }

  deleteItem(id: any): void {
    this.http.delete<void>(`${this.itemsUrl}/${id}`)
    .subscribe(() => {
      this.getItems();
    });
  }
  
  
  
}
