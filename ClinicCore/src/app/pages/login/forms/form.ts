import { Store }             from '@ngrx/store';
import { DynamicForm }       from 'src/app/helper/form/dynamic-form';
import { Validate }          from '../validations/validate';
import { Sanitize }          from '../sanitations/sanitize';
import { AngularFireAuth }   from '@angular/fire/auth';
import { UserLoggedService } from 'src/app/services/user-logged.service';
import { UserLogin }         from 'src/app/models/user-login.interface';
import { Message }           from 'src/app/models/message.model';
import { MessageLoginError } from 'src/app/store/actions/message-login.actions';
import { Injectable }        from '@angular/core';
import { environment }       from 'src/environments/environment';
import { Router }            from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class Form extends DynamicForm {

    constructor(
        public  afAuth           : AngularFireAuth,
        private userLoggedService: UserLoggedService,
        private router           : Router,
        private StoreMessage     : Store<Message>
    ) {
        super();
    }

    public Build() {
        this.DynamicBuildFormGroup();
        this.Validation(new Validate(this));
    }

    onSubmit() {
        this.BeforeSubmit.emit();
        if (!this.IsValid()) return this.AfterSubmit.emit();
        var valores        = this.GetDynamicResults();
        var sanitizeValues = new Sanitize(valores).Exec() as any;
        this._salvaDados(sanitizeValues);
    }

    private _salvaDados(userLogin: UserLogin) {
        this.afAuth.auth.signInWithEmailAndPassword(userLogin.email, userLogin.password).then(userCredential => {
            userCredential.user.getIdTokenResult().then(idTokenResult => {
                this.userLoggedService.SetUser({
                    userInfo: userCredential.user.providerData[0],
                    claims  : idTokenResult.claims
                });
                return this.router.navigateByUrl('/');
            }).catch(e => console.log(e));
        }).catch(this._error.bind(this));
        this._fimProcesso(userLogin);
    }

    private _error(error) {
        if (error != null && error.code != undefined)
            if (error.code == "auth/user-not-found")
                return this.StoreMessage.dispatch(new MessageLoginError(new Message("Erro", "Usuário não encontrado")))
        return this.StoreMessage.dispatch(new MessageLoginError(new Message("Erro", "Ocorreu um erro ao tentar logar")))
    }

    private _fimProcesso(result) {
        this.AfterSubmit.emit();
    }

}
