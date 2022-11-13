import { ChatComponent }        from './pages/chat/chat.component';
import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent }       from './pages/login/login.component';
import { UserLoggedGuard }      from './guards/user-logged.guard.service';

const routes: Routes = [
  { path: 'chat', canActivate: [UserLoggedGuard], component: ChatComponent },
  { path: '', redirectTo: '/chat', pathMatch: 'full' },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
