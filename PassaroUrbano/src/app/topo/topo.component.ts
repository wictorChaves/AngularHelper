import { Observable, Subject, of } from 'rxjs';
import { OfertasService } from './../ofertas.services';
import { Component, OnInit } from '@angular/core';
import { Oferta } from '../shared/oferta.model';
import { switchMap, debounceTime, distinctUntilChanged, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [OfertasService]
})
export class TopoComponent implements OnInit {

  public ofertas: Observable<Oferta[]>;
  public subjectPesquisa: Subject<string> = new Subject<string>();

  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {
    this.ofertas = this.subjectPesquisa
      .pipe(debounceTime(1000))
      .pipe(distinctUntilChanged())
      .pipe(switchMap((termo: string) => { return (termo.trim().length <= 0) ? of() : this.ofertasService.pesquisaOfertas(termo) }))
      .pipe(catchError((erro: any) => {
        console.log(erro);
        return [];
      }));
  }

  public pesquisa(termoDaBusca: string): void {
    this.subjectPesquisa.next(termoDaBusca);
  }

  public limpaPesquisa(): void {
    this.subjectPesquisa.next("teste");
    console.log("Chegou aqui");
  }

}
