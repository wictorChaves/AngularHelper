import { Store }                        from '@ngrx/store';
import { DynamicForm }                  from 'src/app/helper/form/dynamic-form';
import { AngularFireAuth }              from '@angular/fire/auth';
import { UserLogin }                    from 'src/app/models/user-login.interface';
import { Message }                      from 'src/app/models/message.model';
import { AdminValidate }                from '../validations/login.validate';
import { AdminSanitize }                from '../sanitations/admin.sanitize';
import { AdminViewModel }               from '../view-model/admin.viewmodel';
import { AngularFirestore }             from '@angular/fire/firestore';
import { MessageError, MessageSuccess } from 'src/app/store/actions/message.actions';
import { CreateUserAdmin }              from 'src/app/services/create-user-admin.service';
import { Injectable }                   from '@angular/core';
import { User }                         from 'Admin/functions/src/models/user.model';
import { FireFunctionMsg }              from 'src/app/helper/fire-funcition-msg';
import { AdminsService }                from 'src/app/services/admins.service';

@Injectable({
    providedIn: 'root'
})
export class AdminForm extends DynamicForm {

    constructor(
        public  afAuth         : AngularFireAuth,
        private afs            : AngularFirestore,
        private StoreMessage   : Store<Message>,
        private createUserAdmin: CreateUserAdmin,
        private fireFunctionMsg: FireFunctionMsg,
        private adminsService  : AdminsService
    ) {
        super();
    }

    public Build() {
        this.DynamicBuildFormGroup();
        this.Validation(new AdminValidate(this));
    }

    onSubmit() {
        this.BeforeSubmit.emit();
        if (!this.IsValid()) return this.AfterSubmit.emit();
        var valores        = this.GetDynamicResults();
        var sanitizeValues = new AdminSanitize(valores).Exec() as any;
        this._salvaDados(sanitizeValues as AdminViewModel);
    }

    private _salvaDados(adminViewModel: AdminViewModel) {

        var user: User = new User();

        user.email         = adminViewModel.email;
        user.emailVerified = true;
        user.password      = adminViewModel.password;
        user.displayName   = adminViewModel.nome;
        user.disabled      = false;

        this.createUserAdmin.AddUser(user).subscribe(request => {

            if (request.success != true)
                return this._filterErrors(request)

            if (request.data.uid == undefined)
                return this._filterErrors(request)

            this.adminsService.Add(request.data.uid, {
                displayName: user.displayName,
                email      : user.email,
                active     : true
            }).subscribe(this._allRight.bind(this),
                this._filterErrors);

        });
    }

    _allRight(result: any) {
        this.StoreMessage.dispatch(new MessageSuccess(new Message("Tudo certo!", "Registro salvo com sucesso!")));
        this.reset();
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
