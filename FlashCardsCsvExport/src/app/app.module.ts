import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { IgxCsvExporterService } from "igniteui-angular";

import { ReactiveFormsModule } from '@angular/forms';

import { StorageServiceModule } from 'ngx-webstorage-service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    StorageServiceModule 
  ],
  providers: [IgxCsvExporterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
