import { Store }                        from '@ngrx/store';
import { DynamicForm }                  from 'src/app/helper/form/dynamic-form';
import { AngularFireAuth }              from '@angular/fire/auth';
import { UserLogin }                    from 'src/app/models/user-login.interface';
import { Message }                      from 'src/app/models/message.model';
import { MessageError, MessageSuccess } from 'src/app/store/actions/message.actions';
import { Injectable }                   from '@angular/core';
import { FireFunctionMsg }              from 'src/app/helper/fire-funcition-msg';;
import { Validate }                     from '../validations/validate';
import { Sanitize }                     from '../sanitations/sanitize';
import { RecipeService }                from 'src/app/services/recipe.service';
import { ActivatedRoute }               from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class Form extends DynamicForm {

    public uidPatient    = "";
    public uidUser       = "";
    public selectedItems = [];
    public ClearSelectItem: Function;

    constructor(
        public  afAuth         : AngularFireAuth,
        private StoreMessage   : Store<Message>,
        private fireFunctionMsg: FireFunctionMsg,
        private recipeService  : RecipeService,
        private route          : ActivatedRoute
    ) {
        super();
        this.uidPatient = this.route.snapshot.parent.params['uid'];
        this.afAuth.user.subscribe(async userCredential => {
            this.uidUser = userCredential.uid;
        });
    }

    public Build() {
        this.DynamicBuildFormGroup();
        this.Validation(new Validate(this));
    }

    onSubmit() {
        this.BeforeSubmit.emit();
        if (!this.IsValid()) return this.AfterSubmit.emit();
        var            valores        = this.GetDynamicResults();
        var            sanitizeValues = new Sanitize(valores).Exec() as any;
        sanitizeValues['medicines']   = this.selectedItems;
        sanitizeValues['uidPatient']  = this.uidPatient;
        sanitizeValues['uidDoctor']   = this.uidUser;
        this._salvaDados(sanitizeValues);
    }

    AddSelectedItems(selectedItems) {
        this.selectedItems = selectedItems;
    }

    private _salvaDados(sanitizeValues) {
        this.recipeService.Add(sanitizeValues).subscribe(this._allRight.bind(this), this._filterErrors);
    }

    _allRight(result: any) {
        this.StoreMessage.dispatch(new MessageSuccess(new Message("Tudo certo!", "Registro salvo com sucesso!")));
        this.reset();
        this.ClearSelectItem();
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
