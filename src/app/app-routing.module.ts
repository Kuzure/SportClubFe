import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './components/Competitor/competitor-list/user.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InfoComponent } from './components/info/info.component';
import { LoginComponent } from './components/login/login.component';
import { RegisteryComponent } from './components/registery/registery.component';
import { CompetiorAddComponent } from './components/Competitor/competior-add/competior-add.component';
import { GroupListComponent } from './components/group/group-list/group-list.component';
import { GroupAddComponent } from './components/group/group-add/group-add.component';
import { CompeitorDetialComponentComponent } from './components/Competitor/compeitor-detial-component/compeitor-detial-component.component';
import { GroupDetialComponent } from './components/group/group-detial/group-detial.component';
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
    path: 'competitor/:id',
    component: CompeitorDetialComponentComponent,
  },
  {
    path: 'group',
    component: GroupListComponent,
  },
  {
    path: 'group/add',
    component: GroupAddComponent,
  },
  {
    path: 'group/:id',
    component: GroupDetialComponent,
  },
  { path: '**', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule],
})
export class AppRoutingModule {}
