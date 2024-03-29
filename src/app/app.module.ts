import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoginComponent } from './components/login/login.component';
import { SidenavWrapperComponent } from './components/sidenav-wrapper/sidenav-wrapper.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisteryComponent } from './components/registery/registery.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import '@angular/common/locales/global/pl';
import { MatPaginatorModule } from '@angular/material/paginator';
import { UserComponent } from './components/Competitor/competitor-list/user.component';
import { CompetiorAddComponent } from './components/Competitor/competior-add/competior-add.component';
import { GroupListComponent } from './components/group/group-list/group-list.component';
import { GroupAddComponent } from './components/group/group-add/group-add.component';
import { MatMenuModule } from '@angular/material/menu';
import { CompeitorDailogComponentComponent } from './components/Competitor/compeitor-dailog-component/compeitor-dailog-component.component';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { CompeitorDetialComponentComponent } from './components/Competitor/compeitor-detial-component/compeitor-detial-component.component';
import { GroupDetialComponent } from './components/group/group-detial/group-detial.component';
import { CoachGroupsComponent } from './components/coach/coach-groups/coach-groups.component';
import { GroupsNamePipe } from './pipe/groups-name.pipe';
import { CoachAddComponent } from './components/coach/coach-add/coach-add.component';
import { CoachAddToGroupComponent } from './components/coach/coach-add-to-group/coach-add-to-group.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CoachDetailComponent } from './components/coach/coach-detail/coach-detail.component';
import { ExerciseListComponent } from './components/exercise/exercise-list/exercise-list.component';
import { ExerciseAddComponent } from './components/exercise/exercise-add/exercise-add.component';
import { ExerciseDetailsComponent } from './components/exercise/exercise-details/exercise-details.component';
import { GroupCoachesAddComponent } from './components/group/group-coaches-add/group-coaches-add.component';
import { GroupCompetitorAddComponent } from './components/group/group-competitor-add/group-competitor-add.component';
import { GroupExerciseAddComponent } from './components/group/group-exercise-add/group-exercise-add.component';
import { AuthGuard } from './service/authGuard';
import { NgxPrintModule } from 'ngx-print';
import { FullCalendarModule } from '@fullcalendar/angular';
import { DateTimePipe } from './pipe/data-time.pipe';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SidenavWrapperComponent,
    LoginComponent,
    DashboardComponent,
    RegisteryComponent,
    CompetiorAddComponent,
    GroupListComponent,
    GroupAddComponent,
    CompeitorDailogComponentComponent,
    CompeitorDetialComponentComponent,
    GroupDetialComponent,
    CoachGroupsComponent,
    GroupsNamePipe,
    CoachAddComponent,
    CoachAddToGroupComponent,
    CoachDetailComponent,
    ExerciseListComponent,
    ExerciseAddComponent,
    ExerciseDetailsComponent,
    GroupCoachesAddComponent,
    GroupCompetitorAddComponent,
    GroupExerciseAddComponent,
    DateTimePipe,
  ],
  imports: [
    FullCalendarModule,
    NgxPrintModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule,
    MatDialogModule,
    MatCheckboxModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pl-PL' }, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
