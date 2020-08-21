import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt);

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SimpleNotificationsModule } from "angular2-notifications";
import { NgSelectModule } from '@ng-select/ng-select';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { MyDatePickerModule } from 'mydatepicker';

import { InputFileComponent } from './components/form/input-file/input-file.component';
import { SelectSearchComponent } from './components/form/select-search/select-search.component';

import { NavTopMenuComponent } from './components/layout/nav-top-menu/nav-top-menu.component';
import { MenuComponent } from './components/layout/menu/menu.component';
import { NotificationComponent } from './components/layout/notification/notification.component';
import { FooterComponent } from './components/layout/footer/footer.component';

import { HomeComponent } from './paginas/home/home.component';
import { FormularioComponent } from './paginas/formulario/formulario.component';
import { NotificacoesComponent } from './paginas/notificacoes/notificacoes.component';
import { LoadingComponent } from './paginas/loading/loading.component';
import { FormularioFileComponent } from './paginas/formulario-file/formulario-file.component';
import { FormularioSelectMultiComponent } from './paginas/formulario-select-multi/formulario-select-multi.component';
import { FormularioSelectLoadComponent } from './paginas/formulario-select-load/formulario-select-load.component';
import { AlertasComponent } from './paginas/alertas/alertas.component';
import { FormularioDatepickerComponent } from './paginas/formulario-datepicker/formulario-datepicker.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FormularioComponent,
    NavTopMenuComponent,
    MenuComponent,
    NotificationComponent,
    FooterComponent,
    NotificacoesComponent,
    LoadingComponent,
    InputFileComponent,
    SelectSearchComponent,
    FormularioFileComponent,
    FormularioSelectMultiComponent,
    FormularioSelectLoadComponent,
    AlertasComponent,
    FormularioDatepickerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    MyDatePickerModule,
    SimpleNotificationsModule.forRoot(),
    SweetAlert2Module.forRoot(),
    BrowserAnimationsModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
