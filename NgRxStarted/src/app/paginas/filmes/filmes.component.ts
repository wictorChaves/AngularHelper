import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-filmes',
  templateUrl: './filmes.component.html',
  styleUrls: ['./filmes.component.css']
})
export class FilmesComponent implements OnInit {

  movies: Movie[];

  constructor(private movieService: MoviesService) { }

  ngOnInit() {
    this.movieService.getAll().subscribe(movies => this.movies = movies);
  }

}
