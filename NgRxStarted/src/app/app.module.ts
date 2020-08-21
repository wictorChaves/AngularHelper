import { BrowserModule } from '@angular/platform-browser';
import { NgModule }      from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent }     from './app.component';

import { StoreModule }    from '@ngrx/store';
import { counterReducer } from '../ngrx/conter/counter.reducer';
import { HomeComponent } from './paginas/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContadorComponent } from './paginas/contador/contador.component';
import { TradutorComponent } from './paginas/tradutor/tradutor.component';
import { translateReducer } from 'src/ngrx/translate/translate.reducer';
import { PostagemComponent } from './paginas/postagem/postagem.component';
import { postReducer } from 'src/ngrx/post/post.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FilmesComponent } from './paginas/filmes/filmes.component';
import { HttpClientModule } from '@angular/common/http';
import { FilmesRxComponent } from './paginas/filmes-rx/filmes-rx.component';
import { EffectsModule } from '@ngrx/effects';
import { MovieEffects } from './stores/effects/movie.effects';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    HeaderComponent,
    FooterComponent,
    ContadorComponent,
    TradutorComponent,
    PostagemComponent,
    FilmesComponent,
    FilmesRxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ 
      count: counterReducer,
      message: translateReducer,
      post: postReducer
    }),
    EffectsModule.forRoot([MovieEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    }),
    HttpClientModule
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
