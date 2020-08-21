import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private _url: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Movie[]> {
    return this.http.get(this._url + '/movies') as Observable<Movie[]>;
  }

}
