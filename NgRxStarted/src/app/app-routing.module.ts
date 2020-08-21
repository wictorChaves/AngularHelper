import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './paginas/home/home.component';
import { ContadorComponent } from './paginas/contador/contador.component';
import { TradutorComponent } from './paginas/tradutor/tradutor.component';
import { PostagemComponent } from './paginas/postagem/postagem.component';
import { FilmesComponent } from './paginas/filmes/filmes.component';
import { FilmesRxComponent } from './paginas/filmes-rx/filmes-rx.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'contador', component: ContadorComponent },
  { path: 'tradutor', component: TradutorComponent },
  { path: 'postagem', component: PostagemComponent },
  { path: 'filmes', component: FilmesComponent },
  { path: 'filmesrx', component: FilmesRxComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
