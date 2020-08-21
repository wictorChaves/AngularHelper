import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Movie } from 'src/app/models/movie';

@Component({
  selector: 'app-filmes-rx',
  templateUrl: './filmes-rx.component.html',
  styleUrls: ['./filmes-rx.component.css']
})
export class FilmesRxComponent implements OnInit {

  //TO DO: Alterar tipo
  movies$: Observable<Movie[]> = this.store.select(state => state.movies);

  constructor(private store: Store<{ movies: Movie[] }>) {}
  
  ngOnInit() {
    this.store.dispatch({ type: '[Movies Page] Load Movies' });
    this.movies$.subscribe(movies => {
      console.log("aui")
      console.log(movies)
    });
  }

}
