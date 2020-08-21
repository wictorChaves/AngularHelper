import { Store }                        from '@ngrx/store';
import { DynamicForm }                  from 'src/app/helper/form/dynamic-form';
import { AngularFireAuth }              from '@angular/fire/auth';
import { UserLogin }                    from 'src/app/models/user-login.interface';
import { Message }                      from 'src/app/models/message.model';
import { MessageError, MessageSuccess } from 'src/app/store/actions/message.actions';
import { Injectable }                   from '@angular/core';
import { User }                         from 'Admin/functions/src/models/user.model';
import { FireFunctionMsg }              from 'src/app/helper/fire-funcition-msg';;
import { Validate }                     from '../validations/validate';
import { Sanitize }                     from '../sanitations/sanitize';
import { CreateUserPatient }            from 'src/app/services/create-user-patient.service';
import { PatientViewModel }             from '../view-model/patient.viewmodel';
import { PatientsService }              from 'src/app/services/patients.service';

@Injectable({
    providedIn: 'root'
})
export class Form extends DynamicForm {

    constructor(
        public  afAuth           : AngularFireAuth,
        private StoreMessage     : Store<Message>,
        private createUserPatient: CreateUserPatient,
        private fireFunctionMsg  : FireFunctionMsg,
        private patientsService  : PatientsService
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
        this._salvaDados(sanitizeValues as PatientViewModel);
    }

    private _salvaDados(viewModel: PatientViewModel) {

        var user: User = new User();

        user.email         = viewModel.email;
        user.emailVerified = true;
        user.password      = viewModel.password;
        user.displayName   = viewModel.nome;
        user.disabled      = false;

        this.createUserPatient.AddUser(user).subscribe(request => {

            if (request.success != true)
                return this._filterErrors(request)

            if (request.data.uid == undefined)
                return this._filterErrors(request)

            this.patientsService.Add(request.data.uid, {
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
