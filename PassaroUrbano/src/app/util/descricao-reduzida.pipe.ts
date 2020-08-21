import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'descricaoReduzida'
})
export class DescricaoReduzida implements PipeTransform {

    transform(texto: string, trucarEm: number = 15): string {
        if (texto.length > trucarEm) {
            return texto.substr(0, trucarEm) + '...';
        }
        return texto;
    }

}