import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { DashComponent } from './components/dash/dash.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { AuthGuard } from './guards/auth.guard';
import { DuriesComponent } from './components/duries/duries.component';

const routes: Routes = [
  {
    path: '', // Ruta raíz (redirige a 'login' por defecto)
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login', // Ruta predeterminada
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent
  },
  {
    path: 'home',
    component: NavigationComponent, children: [
      {
        path: '', // Ruta predeterminada dentro de 'home' (por ejemplo, el dashboard)
        component: DashComponent
      },
      {
        path: 'tasks',
        component: TasksComponent,
        canActivate: [AuthGuard]

      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard]

      },
      {
        path: 'duries',
        component: DuriesComponent,
        canActivate: [AuthGuard]

      },
    ],
    canActivate: [AuthGuard]


  },




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
