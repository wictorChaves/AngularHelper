import { FormErrorsComponent } from './_layouts/main-layout/helper/form-errors/form-errors.component';
import { BrowserModule }       from '@angular/platform-browser';
import { NgModule }            from '@angular/core';

import { environment } from '../environments/environment';

import { AngularFireModule }         from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { AppRoutingModule }                                 from './app-routing.module';
import { AppComponent }                                     from './app.component';
import { MainLayoutComponent }                              from './_layouts/main-layout/main-layout.component';
import { MainContentComponent }                             from './_layouts/main-layout/main-content/main-content.component';
import { HomeComponent }                                    from './pages/home/home.component';
import { MainMenuComponent }                                from './_layouts/main-layout/main-menu/main-menu.component';
import { MainFooterComponent }                              from './_layouts/main-layout/main-footer/main-footer.component';
import { MainTopComponent }                                 from './_layouts/main-layout/main-top/main-top.component';
import { LoginComponent }                                   from './pages/login/login.component';
import { AngularFireAuth, AngularFireAuthModule }           from '@angular/fire/auth';
import { AngularFireAuthGuard, AngularFireAuthGuardModule } from '@angular/fire/auth-guard';
import { AngularFirestore, AngularFirestoreModule }         from '@angular/fire/firestore';
import { StoreModule }                                      from '@ngrx/store';
import { LoginReducer }                                     from './store/reducers/user-logged.reducer';
import { StorageServiceModule }                             from 'angular-webstorage-service';
import { SessionStorage }                                   from './services/helper/storage/session-storage';
import { ReactiveFormsModule, FormsModule }                 from '@angular/forms';
import { HasDangerComponent }                               from './_layouts/main-layout/helper/has-danger/has-danger.component';
import { MessageReducer }                                   from './store/reducers/message.reducer';
import { CreateAdminComponent }                             from './pages/users/admins/create-admin/create-admin.component';
import { ListAdminComponent }                               from './pages/users/admins/list-admin/list-admin.component';
import { NotificationComponent }                            from './_layout/notification/notification.component';
import { SimpleNotificationsModule, NotificationsService }  from 'angular2-notifications';
import { BrowserAnimationsModule }                          from '@angular/platform-browser/animations';
import { AngularFireFunctions, AngularFireFunctionsModule } from '@angular/fire/functions';
import { EditAdminComponent }                               from './pages/users/admins/edit-admin/edit-admin.component';
import { ListDoctorComponent }                              from './pages/users/doctor/list-doctor/list-doctor.component';
import { CreateDoctorComponent }                            from './pages/users/doctor/create-doctor/create-doctor.component';
import { EditDoctorComponent }                              from './pages/users/doctor/edit-doctor/edit-doctor.component';
import { EditReceptionistsComponent }                       from './pages/users/receptionists/edit-receptionists/edit-receptionists.component';
import { ListReceptionistsComponent }                       from './pages/users/receptionists/list-receptionists/list-receptionists.component';
import { CreateReceptionistsComponent }                     from './pages/users/receptionists/create-receptionists/create-receptionists.component';
import { ListPatientComponent }                             from './pages/users/patients/list-patient/list-patient.component';
import { CreatePatientComponent }                           from './pages/users/patients/create-patient/create-patient.component';
import { EditPatientComponent }                             from './pages/users/patients/edit-patient/edit-patient.component';
import { ListMedicineComponent }                            from './pages/medicine/list-medicine/list-medicine.component';
import { EditMedicineComponent }                            from './pages/medicine/edit-medicine/edit-medicine.component';
import { CreateMedicineComponent }                          from './pages/medicine/create-medicine/create-medicine.component';
import { CreateRecipeComponent }                            from './pages/recipe/create-recipe/create-recipe.component';
import { ListRecipeComponent }                              from './pages/recipe/list-recipe/list-recipe.component';
import { ViewRecipeComponent }                              from './pages/recipe/view-recipe/view-recipe.component';
import { TreePointsPipe }                                   from './pipes/tree-points.pipe';
import { ListPatientProfileComponent }                      from './pages/patient-profile/list-patient-profile/list-patient-profile.component';
import { PatientProfileComponent }                          from './pages/patient-profile/patient-profile/patient-profile.component';
import { ListExamComponent }                                from './pages/exam/list-exam/list-exam.component';
import { RequestExamComponent }                             from './pages/exam/request-exam/request-exam.component';
import { ResultExamComponent }                              from './pages/exam/result-exam/result-exam.component';
import { ViewExamComponent }                                from './pages/exam/view-exam/view-exam.component';
import { ListDoctorScheduleComponent }                      from './pages/doctor-schedule/list-doctor-schedule/list-doctor-schedule.component';
import { EditDoctorScheduleComponent }                      from './pages/doctor-schedule/edit-doctor-schedule/edit-doctor-schedule.component';
import { ListPatientMarkingComponent }                      from './pages/marking/list-patient-marking/list-patient-marking.component';
import { MarkComponent }                                    from './pages/marking/mark/mark.component';
import { ListMarkingComponent }                             from './pages/marking/list-marking/list-marking.component';
import { LogMarkingComponent }                              from './pages/marking/log-marking/log-marking.component';
import { StatisticsMarkingComponent }                       from './pages/marking/statistics-marking/statistics-marking.component';
import { ChartsModule }                                     from 'ng2-charts';
import { ProfileComponent }                                 from './pages/profile/profile.component';
import { MessageLoginReducer }                              from './store/reducers/message-login.reducer';
import { ListRoomComponent }                                from './pages/rooms/list-room/list-room.component';
import { AddRoomComponent }                                 from './pages/rooms/add-room/add-room.component';
import { EditRoomComponent }                                from './pages/rooms/edit-room/edit-room.component';
import { LogoutComponent }                                  from './paginas/logout/logout.component';
import { ListTestComponent }                                from './pages/test/list-test/list-test.component';
import { CreateTestComponent }                              from './pages/test/create-test/create-test.component';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    MainContentComponent,
    HomeComponent,
    MainMenuComponent,
    MainFooterComponent,
    MainTopComponent,
    LoginComponent,
    FormErrorsComponent,
    HasDangerComponent,
    CreateAdminComponent,
    ListAdminComponent,
    NotificationComponent,
    EditAdminComponent,
    ListDoctorComponent,
    CreateDoctorComponent,
    EditDoctorComponent,
    EditReceptionistsComponent,
    ListReceptionistsComponent,
    CreateReceptionistsComponent,
    ListPatientComponent,
    CreatePatientComponent,
    EditPatientComponent,
    ListMedicineComponent,
    EditMedicineComponent,
    CreateMedicineComponent,
    CreateRecipeComponent,
    ListRecipeComponent,
    ViewRecipeComponent,
    TreePointsPipe,
    ListPatientProfileComponent,
    PatientProfileComponent,
    ListExamComponent,
    RequestExamComponent,
    ResultExamComponent,
    ViewExamComponent,
    ListDoctorScheduleComponent,
    EditDoctorScheduleComponent,
    ListPatientMarkingComponent,
    MarkComponent,
    ListMarkingComponent,
    LogMarkingComponent,
    StatisticsMarkingComponent,
    ProfileComponent,
    ListRoomComponent,
    AddRoomComponent,
    EditRoomComponent,
    LogoutComponent,
    ListTestComponent,
    CreateTestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireFunctionsModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireAuthGuardModule,
    StoreModule.forRoot({
      UserLogged  : LoginReducer,
      messageLogin: MessageLoginReducer,
      message     : MessageReducer
    }),
    StorageServiceModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot(),
    ChartsModule
  ],
  providers: [AngularFireAuth, AngularFireAuthGuard, AngularFirestore, SessionStorage, AngularFireFunctions],
  bootstrap: [AppComponent]
})
export class AppModule { }