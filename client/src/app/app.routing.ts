import { Routes, RouterModule } from '@angular/router';

import { ClientRegisterComponent } from './components/client/client-register.component';
import { ClientLoginComponent } from './components/client/client-login.component';
import { EmployerRegisterComponent } from './components/employer/employer-register.component';
import { EmployerLoginComponent } from './components/employer/employer-login.component';
import {NoContentComponent} from './components/no-content/no-content';
import {HomeComponent} from './components/home/home.component'
import {AdminComponent} from './components/admin/admin.component'
import {ClientDashboardComponent} from './components/client/client-dashboard.component';
import {EmployerDashboardComponent} from './components/employer/employer-dashboard.component';
import { AdminGuard } from './guards/admin.guard';
import { ClientGuard } from './guards/client.guard';
import { EmployerGuard } from './guards/employer.guard';
const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'client-login', component: ClientLoginComponent },
  { path: 'client-register', component: ClientRegisterComponent },
  { path: 'employer-login', component: EmployerLoginComponent },
  { path: 'employer-register', component: EmployerRegisterComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard]},
  {path: 'client-dashboard', component: ClientDashboardComponent, canActivate: [ClientGuard] },
  {path: 'employer-dashboard', component: EmployerDashboardComponent, canActivate: [EmployerGuard] },
  // otherwise redirect to home
  { path: '**', component: NoContentComponent }
];

export const routing = RouterModule.forRoot(appRoutes);
