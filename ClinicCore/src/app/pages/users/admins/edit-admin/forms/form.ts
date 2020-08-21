import { Store }                        from '@ngrx/store';
import { DynamicForm }                  from 'src/app/helper/form/dynamic-form';
import { AngularFireAuth }              from '@angular/fire/auth';
import { UserLogin }                    from 'src/app/models/user-login.interface';
import { Message }                      from 'src/app/models/message.model';
import { Validate }                     from '../validations/validate';
import { Sanitize }                     from '../sanitations/sanitize';
import { MessageError, MessageSuccess } from 'src/app/store/actions/message.actions';
import { User }                         from 'Admin/functions/src/models/user.model';
import { FireFunctionMsg }              from 'src/app/helper/fire-funcition-msg';
import { ActivatedRoute }               from '@angular/router';
import { AdminsService }                from 'src/app/services/admins.service';
import { Injectable }                   from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class Form extends DynamicForm {

    uid: string = "";

    constructor(
        public  afAuth         : AngularFireAuth,
        private StoreMessage   : Store<Message>,
        private fireFunctionMsg: FireFunctionMsg,
        private route          : ActivatedRoute,
        private adminsService  : AdminsService
    ) {
        super();
        this.uid = this.route.snapshot.params['uid'];
    }

    public Build(valuesForm: object) {
        this.DynamicBuildFormGroupUpdate(valuesForm);
        this.Validation(new Validate(this));
        this.BeforeSubmit.emit();
        this.adminsService.GetById(this.uid).subscribe(firestoreData => {
            this.patchValue({
                nome : firestoreData.data.displayName,
                email: firestoreData.data.email
            });
            this.AfterSubmit.emit();
        })
    }

    onSubmit() {
        this.BeforeSubmit.emit();
        if (!this.IsValid()) return this.AfterSubmit.emit();
        var valores        = this.GetDynamicResults();
        var sanitizeValues = new Sanitize(valores).Exec() as any;
        this._salvaDados(sanitizeValues);
    }

    private _salvaDados(adminViewModel) {

        var user: User = new User();

        user.email         = adminViewModel.email;
        user.emailVerified = true;
        user.password      = adminViewModel.password;
        user.displayName   = adminViewModel.nome;
        user.disabled      = false;

        this.adminsService.Update(this.uid, {
            displayName: user.displayName
        }).subscribe(this._allRight.bind(this),
            this._filterErrors);

    }

    _allRight(result: any) {
        this.StoreMessage.dispatch(new MessageSuccess(new Message("Tudo certo!", "Registro salvo com sucesso!")));
        return this._finish(result);
    }

    _filterErrors(erro: any): void {
        this.StoreMessage.dispatch(new MessageError(new Message("Erro!", this.fireFunctionMsg.Get(erro, "Erro ao tentar salvar o registro!"))));
        return this._finish(erro);
    }

    private _finish(result: any) {
        return this.AfterSubmit.emit();
    }

}
