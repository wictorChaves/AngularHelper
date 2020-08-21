import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { Autenticacao } from './../../autenticacao.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
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
export class LoginComponent implements OnInit {

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>();

  public erroLogin = "";
  public estadoAnimacao = "repouso";

  public formulario: FormGroup = new FormGroup({
    'email': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(120), Validators.email]),
    'senha': new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(120)])
  });

  constructor(
    private autenticacao: Autenticacao
  ) { }

  ngOnInit() {
    this.formulario.setValue({
      email: 'wictor@hotmail.com.br', 
      senha: '123456'
    });
  }

  public exibirPainelCadastro() {
    this.exibirPainel.emit('cadastro');
  }

  public autenticar(): void {
    this.autenticacao.autenticar(
      this.formulario.value.email,
      this.formulario.value.senha
    ).catch((error: Error) => {
      this.setErroLogin(error.message);
    });
  }

  public setErroLogin(mensagem: string): void {
    this.erroLogin = mensagem;
    this.estadoAnimacao = "animado";
  }

  public animationDone(event) {
    this.estadoAnimacao = "repouso";
  }

}
