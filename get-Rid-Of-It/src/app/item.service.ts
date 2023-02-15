import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Item } from './item.model';
import { Observable, tap, catchError } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
}) 
export class ItemService {
  private itemsUrl = 'http://localhost:3000/api/items';
  
  constructor(private http: HttpClient, 
    private messageService: MessageService) { }
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /** GET: get all items from the server */
  getItems(): Observable<Item[]> {
    this.messageService.add('ItemService: fetched items')
    return this.http.get<Item[]>(this.itemsUrl);
  }

  /** GET item by id. Will 404 if id not found */
  // getItem(id: number): Observable<Item> {
  //   const url = `${this.itemsUrl}/${id}`;
  //   return this.http.get<Item>(url).pipe(
  //     tap(_ => this.log(`fetched hero id=${id}`)),
  //     catchError(this.handleError<Hero>(`getHero id=${id}`))
  //   );
  // }

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
