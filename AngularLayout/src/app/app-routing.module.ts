import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent }                  from './paginas/home/home.component';
import { FormularioComponent }            from './paginas/formulario/formulario.component';
import { NotificacoesComponent }          from './paginas/notificacoes/notificacoes.component';
import { LoadingComponent }               from './paginas/loading/loading.component';
import { FormularioFileComponent }        from './paginas/formulario-file/formulario-file.component';
import { FormularioSelectMultiComponent } from './paginas/formulario-select-multi/formulario-select-multi.component';
import { FormularioSelectLoadComponent }  from './paginas/formulario-select-load/formulario-select-load.component';
import { AlertasComponent } from './paginas/alertas/alertas.component';
import { FormularioDatepickerComponent } from './paginas/formulario-datepicker/formulario-datepicker.component';

const routes: Routes = [
  { path: '',                        redirectTo: '/home', pathMatch: 'full' },
  { path: 'home',                    component: HomeComponent },
  { path: 'loading',                 component: LoadingComponent },
  { path: 'notificacoes',            component: NotificacoesComponent },
  { path: 'alertas',                 component: AlertasComponent },
  { path: 'formulario',              component: FormularioComponent },
  { path: 'formulario-file',         component: FormularioFileComponent },
  { path: 'formulario-select-multi', component: FormularioSelectMultiComponent },
  { path: 'formulario-select-load',  component: FormularioSelectLoadComponent },
  { path: 'formulario-datepicker',   component: FormularioDatepickerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
