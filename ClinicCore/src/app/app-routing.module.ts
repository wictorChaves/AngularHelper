import { CreateAdminComponent }         from './pages/users/admins/create-admin/create-admin.component';
import { ListAdminComponent }           from './pages/users/admins/list-admin/list-admin.component';
import { NgModule }                     from '@angular/core';
import { Routes, RouterModule }         from '@angular/router';
import { HomeComponent }                from './pages/home/home.component';
import { MainLayoutComponent }          from './_layouts/main-layout/main-layout.component';
import { LoginComponent }               from './pages/login/login.component';
import { AuthGuardServiceService }      from './services/auth-guard-service.service';
import { EditAdminComponent }           from './pages/users/admins/edit-admin/edit-admin.component';
import { ListDoctorComponent }          from './pages/users/doctor/list-doctor/list-doctor.component';
import { CreateDoctorComponent }        from './pages/users/doctor/create-doctor/create-doctor.component';
import { EditDoctorComponent }          from './pages/users/doctor/edit-doctor/edit-doctor.component';
import { ListReceptionistsComponent }   from './pages/users/receptionists/list-receptionists/list-receptionists.component';
import { CreateReceptionistsComponent } from './pages/users/receptionists/create-receptionists/create-receptionists.component';
import { EditReceptionistsComponent }   from './pages/users/receptionists/edit-receptionists/edit-receptionists.component';
import { ListPatientComponent }         from './pages/users/patients/list-patient/list-patient.component';
import { EditPatientComponent }         from './pages/users/patients/edit-patient/edit-patient.component';
import { CreatePatientComponent }       from './pages/users/patients/create-patient/create-patient.component';
import { ListMedicineComponent }        from './pages/medicine/list-medicine/list-medicine.component';
import { CreateMedicineComponent }      from './pages/medicine/create-medicine/create-medicine.component';
import { EditMedicineComponent }        from './pages/medicine/edit-medicine/edit-medicine.component';
import { ListRecipeComponent }          from './pages/recipe/list-recipe/list-recipe.component';
import { CreateRecipeComponent }        from './pages/recipe/create-recipe/create-recipe.component';
import { ViewRecipeComponent }          from './pages/recipe/view-recipe/view-recipe.component';
import { ListPatientProfileComponent }  from './pages/patient-profile/list-patient-profile/list-patient-profile.component';
import { PatientProfileComponent }      from './pages/patient-profile/patient-profile/patient-profile.component';
import { ListExamComponent }            from './pages/exam/list-exam/list-exam.component';
import { RequestExamComponent }         from './pages/exam/request-exam/request-exam.component';
import { ResultExamComponent }          from './pages/exam/result-exam/result-exam.component';
import { ViewExamComponent }            from './pages/exam/view-exam/view-exam.component';
import { ListDoctorScheduleComponent }  from './pages/doctor-schedule/list-doctor-schedule/list-doctor-schedule.component';
import { EditDoctorScheduleComponent }  from './pages/doctor-schedule/edit-doctor-schedule/edit-doctor-schedule.component';
import { ListPatientMarkingComponent }  from './pages/marking/list-patient-marking/list-patient-marking.component';
import { MarkComponent }                from './pages/marking/mark/mark.component';
import { ListMarkingComponent }         from './pages/marking/list-marking/list-marking.component';
import { LogMarkingComponent }          from './pages/marking/log-marking/log-marking.component';
import { StatisticsMarkingComponent }   from './pages/marking/statistics-marking/statistics-marking.component';
import { ProfileComponent }             from './pages/profile/profile.component';
import { ListRoomComponent }            from './pages/rooms/list-room/list-room.component';
import { AddRoomComponent }             from './pages/rooms/add-room/add-room.component';
import { EditRoomComponent }            from './pages/rooms/edit-room/edit-room.component';
import { LogoutComponent }              from './paginas/logout/logout.component';
import { ListTestComponent }            from './pages/test/list-test/list-test.component';
import { CreateTestComponent }          from './pages/test/create-test/create-test.component';

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      { path: '', component: HomeComponent, canActivate: [AuthGuardServiceService], pathMatch: 'full' },

      { path: 'administradores', component: ListAdminComponent, canActivate: [AuthGuardServiceService] },
      { path: 'administradores/criar', component: CreateAdminComponent, canActivate: [AuthGuardServiceService] },
      { path: 'administradores/editar/:uid', component: EditAdminComponent, canActivate: [AuthGuardServiceService] },

      { path: 'medicos', component: ListDoctorComponent, canActivate: [AuthGuardServiceService], data: { token: 'admin' } },
      { path: 'medicos/criar', component: CreateDoctorComponent, canActivate: [AuthGuardServiceService], data: { token: 'admin' } },
      { path: 'medicos/editar/:uid', component: EditDoctorComponent, canActivate: [AuthGuardServiceService], data: { token: 'admin' } },

      { path: 'teste', component: ListTestComponent, canActivate: [AuthGuardServiceService], data: { token: 'admin' } },
      { path: 'teste/criar', component: CreateTestComponent, canActivate: [AuthGuardServiceService], data: { token: 'admin' } },

      { path: 'recepcionistas', component: ListReceptionistsComponent, canActivate: [AuthGuardServiceService], data: { token: 'admin' } },
      { path: 'recepcionistas/criar', component: CreateReceptionistsComponent, canActivate: [AuthGuardServiceService], data: { token: 'admin' } },
      { path: 'recepcionistas/editar/:uid', component: EditReceptionistsComponent, canActivate: [AuthGuardServiceService], data: { token: 'admin' } },

      { path: 'pacientes', component: ListPatientComponent, canActivate: [AuthGuardServiceService], data: { token: 'reception' } },
      { path: 'pacientes/criar', component: CreatePatientComponent, canActivate: [AuthGuardServiceService], data: { token: 'reception' } },
      { path: 'pacientes/editar/:uid', component: EditPatientComponent, canActivate: [AuthGuardServiceService], data: { token: 'reception' } },

      { path: 'agenda-medico', component: ListDoctorScheduleComponent, canActivate: [AuthGuardServiceService], data: { token: 'reception' } },
      { path: 'agenda-medico/editar/:uid', component: EditDoctorScheduleComponent, canActivate: [AuthGuardServiceService], data: { token: 'reception' } },

      { path: 'marcacao', component: ListMarkingComponent, canActivate: [AuthGuardServiceService], data: { token: 'reception' } },
      { path: 'marcacao/marcar', component: ListPatientMarkingComponent, canActivate: [AuthGuardServiceService], data: { token: 'reception' } },
      { path: 'marcacao/historico', component: LogMarkingComponent, canActivate: [AuthGuardServiceService], data: { token: 'reception' } },
      { path: 'marcacao/estastisticas', component: StatisticsMarkingComponent, canActivate: [AuthGuardServiceService], data: { token: 'reception' } },
      { path: 'marcacao/marcar/:uid', component: MarkComponent, canActivate: [AuthGuardServiceService], data: { token: 'reception' } },

      { path: 'salas', component: ListRoomComponent, canActivate: [AuthGuardServiceService], data: { token: 'reception' } },
      { path: 'salas/adicionar', component: AddRoomComponent, canActivate: [AuthGuardServiceService], data: { token: 'reception' } },
      { path: 'salas/editar/:uid', component: EditRoomComponent, canActivate: [AuthGuardServiceService], data: { token: 'reception' } },

      { path: 'medicamentos', component: ListMedicineComponent, canActivate: [AuthGuardServiceService], data: { token: 'doctor' } },
      { path: 'medicamentos/criar', component: CreateMedicineComponent, canActivate: [AuthGuardServiceService], data: { token: 'doctor' } },
      { path: 'medicamentos/editar/:uid', component: EditMedicineComponent, canActivate: [AuthGuardServiceService], data: { token: 'doctor' } },

      { path: 'perfil-paciente', component: ListPatientProfileComponent, canActivate: [AuthGuardServiceService], data: { token: 'doctor' } },
      { path: 'perfil-paciente/:uid', component: PatientProfileComponent, canActivate: [AuthGuardServiceService], data: { token: 'doctor' } },

      {
        path: 'perfil/:uid', component: ProfileComponent, children: [

          { path: '', component: ListRecipeComponent, pathMatch: 'full' },

          { path: 'receitas', component: ListRecipeComponent, canActivate: [AuthGuardServiceService], data: { token: 'patient' } },
          { path: 'receitas/criar', component: CreateRecipeComponent, canActivate: [AuthGuardServiceService], data: { token: 'patient' } },
          { path: 'receitas/visualizar/:uid', component: ViewRecipeComponent, canActivate: [AuthGuardServiceService], data: { token: 'patient' } },

          { path: 'exames', component: ListExamComponent, canActivate: [AuthGuardServiceService], data: { token: 'patient' } },
          { path: 'exames/solicitar', component: RequestExamComponent, canActivate: [AuthGuardServiceService], data: { token: 'patient' } },
          { path: 'exames/resultado/:uid', component: ResultExamComponent, canActivate: [AuthGuardServiceService], data: { token: 'patient' } },
          { path: 'exames/visualizar/:uid', component: ViewExamComponent, canActivate: [AuthGuardServiceService], data: { token: 'patient' } },

        ]
      },

      {
        path: 'perfil-paciente/:uid', component: PatientProfileComponent, children: [

          { path: '', component: ListRecipeComponent, pathMatch: 'full' },

          { path: 'receitas', component: ListRecipeComponent, canActivate: [AuthGuardServiceService], data: { token: 'doctor' } },
          { path: 'receitas/criar', component: CreateRecipeComponent, canActivate: [AuthGuardServiceService], data: { token: 'doctor' } },
          { path: 'receitas/visualizar/:uid', component: ViewRecipeComponent, canActivate: [AuthGuardServiceService], data: { token: 'doctor' } },

          { path: 'exames', component: ListExamComponent, canActivate: [AuthGuardServiceService], data: { token: 'doctor' } },
          { path: 'exames/solicitar', component: RequestExamComponent, canActivate: [AuthGuardServiceService], data: { token: 'doctor' } },
          { path: 'exames/resultado/:uid', component: ResultExamComponent, canActivate: [AuthGuardServiceService], data: { token: 'doctor' } },
          { path: 'exames/visualizar/:uid', component: ViewExamComponent, canActivate: [AuthGuardServiceService], data: { token: 'doctor' } },

        ]
      }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }