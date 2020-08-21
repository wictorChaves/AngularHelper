import { Store }                        from '@ngrx/store';
import { DynamicForm }                  from 'src/app/helper/form/dynamic-form';
import { Message }                      from 'src/app/models/message.model';
import { MessageError, MessageSuccess } from 'src/app/store/actions/message.actions';
import { User }                         from 'Admin/functions/src/models/user.model';
import { FireFunctionMsg }              from 'src/app/helper/fire-funcition-msg';
import { CreateUserDoctor }             from 'src/app/services/create-user-doctor.service';
import { DoctorsService }               from 'src/app/services/doctors.service';
import { Validate }                     from '../validations/validate';
import { Sanitize }                     from '../sanitations/sanitize';
import { DoctorViewModel }              from '../view-model/doctor.viewmodel';
import { Injectable }                   from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class Form extends DynamicForm {

    constructor(
        private store           : Store<any>,
        private createUserDoctor: CreateUserDoctor,
        private fireFunctionMsg : FireFunctionMsg,
        private doctorsService  : DoctorsService
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
        this._salvaDados(sanitizeValues as DoctorViewModel);
    }

    private _salvaDados(doctorViewModel: DoctorViewModel) {

        var user: User = new User();

        user.email         = doctorViewModel.email;
        user.emailVerified = true;
        user.password      = doctorViewModel.password;
        user.displayName   = doctorViewModel.nome;
        user.disabled      = false;

        this.createUserDoctor.AddUser(user).subscribe(request => {

            if (request.success != true)
                return this._filterErrors(request)

            if (request.data.uid == undefined)
                return this._filterErrors(request)

            this.doctorsService.Add(request.data.uid, {
                displayName: user.displayName,
                email      : user.email,
                active     : true
            }).subscribe(this._allRight.bind(this),
                this._filterErrors);

        });
    }

    _allRight(result: any) {
        this.store.dispatch(new MessageSuccess(new Message("Tudo certo!", "Registro salvo com sucesso!")));
        this.reset();
        return this._finish(result);
    }

    _filterErrors(erro: any): void {
        this.store.dispatch(new MessageError(new Message("Erro!", this.fireFunctionMsg.Get(erro, "Erro ao tentar salvar o registro!"))));
        return this._finish(erro);
    }

    private _finish(result: any) {
        return this.AfterSubmit.emit();
    }

}
