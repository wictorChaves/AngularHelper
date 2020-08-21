import { OfertasService } from './../../ofertas.services';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-onde-fica',
  templateUrl: './onde-fica.component.html',
  styleUrls: ['./onde-fica.component.css'],
  providers: [OfertasService]
})
export class OndeFicaComponent implements OnInit {

  public ondeFica: string;

  constructor(private route: ActivatedRoute, private ofertasService: OfertasService) { }

  ngOnInit() {
    this.route.parent.params.subscribe((parametros: Params) => {
    this.ofertasService.getOndeFicaOfertaPorId(parametros.id)
      .then((resposta: string) => {
        this.ondeFica = resposta;
      });
    }); 
  }

}
