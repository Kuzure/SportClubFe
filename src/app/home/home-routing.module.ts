import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidenavWrapperComponent } from './components/sidenav-wrapper/sidenav-wrapper.component';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
  {
    path: '',
    component: SidenavWrapperComponent,
    children: [
      {
        path: 'home',
        component: HomePageComponent,
      },
      {
        path: 'home1',
        component: HomePageComponent,
      },
      {
        path: 'home2',
        component: HomePageComponent,
      },
    ],
  },
  {
    path: '*',
    redirectTo: '/home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
