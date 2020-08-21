import { Component, OnInit }            from '@angular/core';
import { LoadingHelper }                from 'src/app/helper/loading-helper';
import { FireFunctionMsg }              from 'src/app/helper/fire-funcition-msg';
import { MessageSuccess, MessageError } from 'src/app/store/actions/message.actions';
import { Message }                      from 'src/app/models/message.model';
import { RecipeService }                from 'src/app/services/recipe.service';
import { Store }                        from '@ngrx/store';
import { ActivatedRoute }               from '@angular/router';
import { UserLoggedService }            from 'src/app/services/user-logged.service';
import { Observable, from }             from 'rxjs';

@Component({
  selector   : 'app-list-recipe',
  templateUrl: './list-recipe.component.html',
  styleUrls  : ['./list-recipe.component.css'],
  providers  : [
    LoadingHelper,
    FireFunctionMsg
  ]
})
export class ListRecipeComponent implements OnInit {

  public uid  = "";
  public list = [];
  public userLogged$: Observable<any>;

  constructor(
    private recipeService    : RecipeService,
    public  loadingHelper    : LoadingHelper,
    private fireFunctionMsg  : FireFunctionMsg,
    private StoreMessage     : Store<string>,
    private route            : ActivatedRoute,
    public  userLoggedService: UserLoggedService
  ) {
    this.uid         = this.route.snapshot.parent.params['uid'];
    this.userLogged$ = from(this.userLoggedService.GetUser());
  }

  ngOnInit() {
    this.recipeService.GetByUidPatient(this.uid).subscribe(list => {
      this.list = list;
    }, this._filterErrors.bind(this));
  }

  RemoveItem(uid: string) {
    this.loadingHelper.Start();
    this.recipeService.Update(uid, {
      active: false
    }).subscribe(this._allRightRemove.bind(this),
      this._filterErrors.bind(this));
  }

  Disable(uid: string) {
    this.loadingHelper.Start();
    this.recipeService.Update(uid, {
      active: false
    }).subscribe(this._allRight.bind(this),
      this._filterErrors);
  }

  Enable(uid: string) {
    this.loadingHelper.Start();
    this.recipeService.Update(uid, {
      active: true
    }).subscribe(this._allRight.bind(this),
      this._filterErrors);
  }

  _allRightRemove(result: any) {
    this.StoreMessage.dispatch(new MessageSuccess(new Message("Tudo certo!", "Item excluído com sucesso!")));
    return this._finish(result);
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
    return this.loadingHelper.Stop();
  }

}
