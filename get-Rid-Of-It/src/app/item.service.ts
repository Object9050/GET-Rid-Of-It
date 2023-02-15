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
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /** GET: get all items from the server */
  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.itemsUrl);
  }

  /** POST: add a new item to the server */
  addItem(item: Item): Observable<Item> {
    return this.http.post<Item>(this.itemsUrl, item, this.httpOptions)
  }

  /** PUT: update an item on the server */
  editItem(item: Item): Observable<Item> {
    return this.http.put<Item>(`${this.itemsUrl}/${item.id}`, item, this.httpOptions);
  }

  /** DELETE: delete an from the server */
  deleteItem(id: string): Observable<Item> {
    return this.http.delete<Item>(`${this.itemsUrl}/${id}`, this.httpOptions);
  }
  
  
  
}
