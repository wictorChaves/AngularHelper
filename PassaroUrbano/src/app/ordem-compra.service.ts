import { Injectable } from '@angular/core';
import { URL_API } from './app.api';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Pedido } from './shared/pedido.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class OrdemCompraService {

    constructor(private http: Http) { }

    public efetivarCompra(pedido: Pedido): Observable<any> {
        
        let headers: Headers = new Headers();

        headers.append('Content-type', 'application/json');

        return this.http.post(
            `${URL_API}/pedidos`,
            JSON.stringify(pedido),
            new RequestOptions({ headers: headers })
        ).pipe(
            map((response: Response) => {
                return response.json().id;
            })
        );
    }

}