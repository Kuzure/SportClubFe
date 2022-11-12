import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './components/Competitor/competitor-list/user.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InfoComponent } from './components/info/info.component';
import { LoginComponent } from './components/login/login.component';
import { RegisteryComponent } from './components/registery/registery.component';
import { CompetiorAddComponent } from './components/Competitor/competior-add/competior-add.component';
import { GroupListComponent } from './components/group/group-list/group-list.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'rejestracja', component: RegisteryComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'info',
    component: InfoComponent,
  },
  {
    path: 'competitor',
    component: UserComponent,
  },
  {
    path: 'competitor/add',
    component: CompetiorAddComponent,
  },
  {
    path: 'group',
    component: GroupListComponent,
  },

  { path: '**', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule],
})
export class AppRoutingModule {}
