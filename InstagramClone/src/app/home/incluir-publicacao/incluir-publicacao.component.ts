import { Progresso } from './../../progresso.service';
import { Imagem } from './../../acesso/banner/imagem.model';
import { Bd } from './../../bd.servece';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import * as firebase from 'firebase';
import { Observable, interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.css']
})
export class IncluirPublicacaoComponent implements OnInit {

  @Output() public atualizarTimeLine: EventEmitter<any> = new EventEmitter<any>();

  public email: string;
  public imagem: any;

  public progressoPublicacao: string = 'pendente';
  public porcentagemUpload: number;

  public formulario: FormGroup = new FormGroup({
    'titulo': new FormControl(null)
  });

  constructor(
    private bd: Bd,
    private progresso: Progresso
  ) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email;
    });
  }

  public publicar(): void {
    this.bd.publicar({
      email: this.email,
      titulo: this.formulario.value.titulo,
      imagem: this.imagem[0]
    });

    let continua = new Subject();

    let acompanhamentoUpload = interval(1500)
      .pipe(takeUntil(continua));

    acompanhamentoUpload
      .subscribe(() => {
        this.progressoPublicacao = 'andamento';

        this.porcentagemUpload = Math.round((this.progresso.estado.bytesTransferred / this.progresso.estado.totalBytes) * 100);

        if (this.progresso.status === 'concluido') {
          this.progressoPublicacao = 'concluido';
          this.atualizarTimeLine.emit();
          continua.next(false);
        }
      });
  }

  public preparaImagemUpload(event: Event) {
    this.imagem = (<HTMLInputElement>event.target).files;
  }

}
