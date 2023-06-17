import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Feature1Component } from './feature1.component';
import { Feature1Service } from './feature1.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CdkTableModule } from '@angular/cdk/table';
import { FakeBackendInterceptor } from './mocks/fake-backend.interceptor';
import { Feature1RoutingModule } from './feature1.routing.module';



@NgModule({
  declarations: [Feature1Component],
  imports: [
    CommonModule,
    HttpClientModule,
    Feature1RoutingModule,
    CdkTableModule
  ],
  providers: [
    Feature1Service,
    // Providing fake backend interceptor for simulating api calls. Remove this before using an actual api
    {
      provide: HTTP_INTERCEPTORS,
      useClass: FakeBackendInterceptor,
      multi: true
    }
  ]
})
export class Feature1Module { }
