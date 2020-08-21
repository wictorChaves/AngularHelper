import { Autenticacao } from './../../autenticacao.service';
import { Usuario } from './../usuario.model';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
  animations: [
    trigger('animacao-form-invalido', [
      state('repouso', style({
        transform: 'translate(0px, 0px)'
      })),
      transition('repouso => animado', [
        animate(500, keyframes([
          style({ opacity: 1, transform: 'translate(10px, 0px)', offset: 0.1 }),
          style({ opacity: 1, transform: 'translate(-10px, 0px)', offset: 0.2 }),
          style({ opacity: 1, transform: 'translate(10px, 0px)', offset: 0.3 }),
          style({ opacity: 1, transform: 'translate(-10px, 0px)', offset: 0.4 }),
          style({ opacity: 1, transform: 'translate(10px, 0px)', offset: 0.5 }),
          style({ opacity: 1, transform: 'translate(-10px, 0px)', offset: 0.6 }),
          style({ opacity: 1, transform: 'translate(10px, 0px)', offset: 0.7 }),
          style({ opacity: 1, transform: 'translate(-10px, 0px)', offset: 0.8 }),
        ]))
      ])
    ])
  ]
})
export class CadastroComponent implements OnInit {

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>();

  public erroCadastro = "";
  public estadoAnimacao = "repouso";

  public formulario: FormGroup = new FormGroup({
    'email': new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(120), Validators.email]),
    'nome_completo': new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(120)]),
    'nome_usuario': new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(120)]),
    'senha': new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(120)])
  });

  constructor(
    private autenticacao: Autenticacao
  ) { }

  ngOnInit() {
  }

  public exibirPainelLogin(): void {
    this.exibirPainel.emit('login');
  }

  public cadastrarUsuario(): void {

    let usuario: Usuario = new Usuario(
      this.formulario.value.email,
      this.formulario.value.nome_completo,
      this.formulario.value.nome_usuario,
      this.formulario.value.senha
    );

    this.autenticacao.cadastrarUsuario(usuario)
      .then(() => this.exibirPainelLogin())
      .catch((error: Error) => {
        this.setErroCadastro(error.message);
      });
  }

  public setErroCadastro(mensagem: string): void {
    this.erroCadastro = mensagem;
    this.estadoAnimacao = "animado";
  }

  public animationDone(event) {
    this.estadoAnimacao = "repouso";
  }


}
