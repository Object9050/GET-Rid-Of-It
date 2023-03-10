import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Item } from './item.model';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
}) 
export class ItemService {
  private itemsUrl = 'http://localhost:3000/api/items'; // URL to web api
  
  constructor(
    private http: HttpClient, 
    private messageService: MessageService) { }
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  /** GET: get all items from the server */
  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.itemsUrl)
    .pipe(
      tap(_ => this.log('Fetched items')),
      catchError(this.handleError<Item[]>('getItems', []))
    );
  }
  
  /** GET: get item by id. Will 404 if id not found */
  getItem(id: number): Observable<Item> {
    const url = `${this.itemsUrl}/${id}`;
    return this.http.get<Item>(url)
    .pipe(
      tap(_ => this.log(`Fetched item ID: ${id}`)),
      catchError(this.handleError<Item>(`getItem ID: ${id}`))
      );
    }
    
  /** POST: add a new item to the server */
  addItem(item: Item): Observable<Item> {
    return this.http.post<Item>(this.itemsUrl, item, this.httpOptions)
    .pipe(
      tap((newItem: Item) => this.log(`Added item w/ ID: ${newItem.id}`)),
      catchError(this.handleError<Item>('addItem'))
    );
  }
  
  /** PUT: update an item on the server */
  updateItem(item: Item): Observable<Item> {
    return this.http.put<Item>(`${this.itemsUrl}/${item.id}`, item, this.httpOptions)
    .pipe(
      tap(_ => this.log(`Updated item ID: ${item.id}`)),
      catchError(this.handleError<any>('updateItem'))
    );
  }
  
  /** DELETE: delete an item from the server */
  deleteItem(id: string): Observable<Item> {
    return this.http.delete<Item>(`${this.itemsUrl}/${id}`)
    .pipe(
      tap(_ => this.log(`Deleted item ID: ${id}`)),
      catchError(this.handleError<Item>('deleteItem'))
    );
  }
  
  /** Generates an ID depending on the length of the items array 
    * Description: If items.length > 0 ... do Math.max... else set ID as '1'. */
  genId(items: Item[]): string {
    return items.length > 0 ? (Math.max(...items.map(item => +item.id)) + 1).toString() : '1';
  }

  /** Log an ItemService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`ItemService: ${message}`);
  }
  
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
    
}
  