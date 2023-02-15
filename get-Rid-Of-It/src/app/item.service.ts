import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  editItem(item: Item): Observable<Item> {
    return this.http.put<Item>(`${this.itemsUrl}/${item.id}`, item);
  }

  // httpOptions = {
  //   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  // };
  
  deleteItem(id: any): Observable<void> {
    return this.http.delete<void>(`${this.itemsUrl}/${id}`);
  }
  
  
  
}
