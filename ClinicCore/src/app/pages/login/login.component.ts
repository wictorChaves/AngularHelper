import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT }                  from '@angular/common';
import { Form }                      from './forms/form';
import { LoadingHelper }             from 'src/app/helper/loading-helper';
import { Message }                   from 'src/app/models/message.model';
import { Store, select }             from '@ngrx/store';
import { Observable }                from 'rxjs';
import { AngularFireAuth }           from '@angular/fire/auth';
import { auth }                      from 'firebase/app';
import { MasterHelper }              from 'src/app/helper/master-helper';
import { MessageLoginError }         from 'src/app/store/actions/message-login.actions';
import { UserLoggedService }         from 'src/app/services/user-logged.service';
import { environment }               from 'src/environments/environment';
import { Router }                    from '@angular/router';

@Component({
  selector   : 'app-login',
  templateUrl: './login.component.html',
  styleUrls  : ['./login.component.css'],
  providers  : [
    Form,
    LoadingHelper,
    MasterHelper
  ]
})
export class LoginComponent implements OnInit {

  public message$: Observable<Message>

  constructor(
    @Inject(DOCUMENT) private document: Document,
    public  formulario                : Form,
    public  loadingHelper             : LoadingHelper,
    private store                     : Store<Message>,
    public  afAuth                    : AngularFireAuth,
    private masterHelper              : MasterHelper,
    private userLoggedService         : UserLoggedService,
    private router                    : Router
  ) {
    this.message$ = this.store.pipe(select("messageLogin"));
  }

  ngOnInit() {
    this.formulario.Build();
    this.formulario.BeforeSubmit.subscribe(this.loadingHelper.Start.bind(this.loadingHelper));
    this.formulario.AfterSubmit.subscribe(this.loadingHelper.Stop.bind(this.loadingHelper));
    this._layout();
  }

  private _layout() {
    this.document.body.classList.remove('horizontal');
    this.document.body.classList.add('bg-light');
    this.document.body.classList.add('pace-done');
  }

  LoginMaster() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(userCredential => {
      if (this.masterHelper.IsMaster(userCredential.user)) {
        userCredential.user.getIdTokenResult().then(idTokenResult => {
          this.userLoggedService.SetUser({
            userInfo: userCredential.user.providerData[0],
            claims  : {
              master: true
            }
          });
          return this.router.navigateByUrl('/administradores');
        }).catch(e => console.log(e));
      }
      this.store.dispatch(new MessageLoginError(new Message("Erro", "Este usuário não é Master")));
    }).catch(e => console.log(e));
  }

}
