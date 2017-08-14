import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './components/register/index';
import { LoginComponent } from './components/login/login.component';
import {NoContentComponent} from './components/no-content/no-content';
import {HomeComponent} from './components/home/home.component'
import {AdminComponent} from './components/admin/admin.component'
import {ProfileComponent} from './components/profile/profile.component'
import { AdminGuard } from './guards/admin.guard';
import { ClientGuard } from './guards/client.guard';
const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [ClientGuard] },
  // otherwise redirect to home
  { path: '**', component: NoContentComponent }
];

export const routing = RouterModule.forRoot(appRoutes);
