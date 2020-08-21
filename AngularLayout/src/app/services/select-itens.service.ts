import { Injectable }     from '@angular/core';
import { Observable, of } from 'rxjs';
import { Item }           from './model/item.model';

@Injectable({
  providedIn: 'root'
})
export class SelectItensService {

  constructor() { }

  getAll(): Observable<Item[]> {
    return of([
      { id: 1, name: "Item 1" },
      { id: 2, name: "Item 2" },
      { id: 3, name: "Item 3" }
    ]);
  }

  getById(id: number): Observable<Item[]> {
    return of([
      {
        id: 1, sub: [
          { id: 1, name: "Sub Item 1" },
          { id: 2, name: "Sub Item 2" },
          { id: 3, name: "Sub Item 3" }
        ]
      },
      {
        id: 2, sub: [
          { id: 1, name: "Sub Item 4" },
          { id: 2, name: "Sub Item 5" },
          { id: 3, name: "Sub Item 6" }
        ]
      },
      {
        id: 3, sub: [
          { id: 1, name: "Sub Item 7" },
          { id: 2, name: "Sub Item 8" },
          { id: 3, name: "Sub Item 9" }
        ]
      }
    ].find(i => i.id == id).sub);
  }

}
