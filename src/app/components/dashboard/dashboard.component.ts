import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import plLocale from '@fullcalendar/core/locales/pl';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    weekends: false,
    events: [
      {
        title: 'Grupa początkująca',
        start: new Date('2023-01-02').setHours(17, 0, 0),
      },
      {
        title: 'Grupa średniozaawansowana',
        start: new Date('2023-01-02').setHours(18, 30, 0),
      },
      {
        title: 'Grupa zawansowana',
        start: new Date('2023-01-02').setHours(20, 0, 0),
      },
      {
        title: 'Grupa początkująca',
        start: new Date('2023-01-04').setHours(17, 0, 0),
      },
      {
        title: 'Grupa średniozaawansowana',
        start: new Date('2023-01-04').setHours(18, 30, 0),
      },
      {
        title: 'Grupa zawansowana',
        start: new Date('2023-01-04').setHours(20, 0, 0),
      },
      {
        title: 'Grupa początkująca',
        start: new Date('2023-01-06').setHours(17, 0, 0),
      },
      {
        title: 'Grupa średniozaawansowana',
        start: new Date('2023-01-06').setHours(18, 30, 0),
      },
      {
        title: 'Grupa zawansowana',
        start: new Date('2023-01-06').setHours(20, 0, 0),
      },
      {
        title: 'Grupa początkująca',
        start: new Date('2023-01-09').setHours(17, 0, 0),
      },
      {
        title: 'Grupa średniozaawansowana',
        start: new Date('2023-01-09').setHours(18, 30, 0),
      },
      {
        title: 'Grupa zawansowana',
        start: new Date('2023-01-09').setHours(20, 0, 0),
      },
      {
        title: 'Grupa początkująca',
        start: new Date('2023-01-011').setHours(17, 0, 0),
      },
      {
        title: 'Grupa średniozaawansowana',
        start: new Date('2023-01-011').setHours(18, 30, 0),
      },
      {
        title: 'Grupa zawansowana',
        start: new Date('2023-01-011').setHours(20, 0, 0),
      },
      {
        title: 'Grupa początkująca',
        start: new Date('2023-01-13').setHours(17, 0, 0),
      },
      {
        title: 'Grupa średniozaawansowana',
        start: new Date('2023-01-13').setHours(18, 30, 0),
      },
      {
        title: 'Grupa zawansowana',
        start: new Date('2023-01-13').setHours(20, 0, 0),
      },
      {
        title: 'Grupa zawansowana',
        start: new Date('2023-01-06').setHours(20, 0, 0),
      },
      {
        title: 'Grupa początkująca',
        start: new Date('2023-01-16').setHours(17, 0, 0),
      },
      {
        title: 'Grupa średniozaawansowana',
        start: new Date('2023-01-16').setHours(18, 30, 0),
      },
      {
        title: 'Grupa zawansowana',
        start: new Date('2023-01-16').setHours(20, 0, 0),
      },
      {
        title: 'Grupa początkująca',
        start: new Date('2023-01-18').setHours(17, 0, 0),
      },
      {
        title: 'Grupa średniozaawansowana',
        start: new Date('2023-01-18').setHours(18, 30, 0),
      },
      {
        title: 'Grupa zawansowana',
        start: new Date('2023-01-18').setHours(20, 0, 0),
      },
      {
        title: 'Grupa początkująca',
        start: new Date('2023-01-20').setHours(17, 0, 0),
      },
      {
        title: 'Grupa średniozaawansowana',
        start: new Date('2023-01-20').setHours(18, 30, 0),
      },
      {
        title: 'Grupa zawansowana',
        start: new Date('2023-01-20').setHours(20, 0, 0),
      },      
      {
        title: 'Grupa początkująca',
        start: new Date('2023-01-23').setHours(17, 0, 0),
      },
      {
        title: 'Grupa średniozaawansowana',
        start: new Date('2023-01-23').setHours(18, 30, 0),
      },
      {
        title: 'Grupa zawansowana',
        start: new Date('2023-01-23').setHours(20, 0, 0),
      },
      {
        title: 'Grupa początkująca',
        start: new Date('2023-01-25').setHours(17, 0, 0),
      },
      {
        title: 'Grupa średniozaawansowana',
        start: new Date('2023-01-25').setHours(18, 30, 0),
      },
      {
        title: 'Grupa zawansowana',
        start: new Date('2023-01-25').setHours(20, 0, 0),
      },
      {
        title: 'Grupa początkująca',
        start: new Date('2023-01-27').setHours(17, 0, 0),
      },
      {
        title: 'Grupa średniozaawansowana',
        start: new Date('2023-01-27').setHours(18, 30, 0),
      },
      {
        title: 'Grupa zawansowana',
        start: new Date('2023-01-27').setHours(20, 0, 0),
      },
      {
        title: 'Grupa początkująca',
        start: new Date('2023-01-30').setHours(17, 0, 0),
      },
      {
        title: 'Grupa średniozaawansowana',
        start: new Date('2023-01-30').setHours(18, 30, 0),
      },
      {
        title: 'Grupa zawansowana',
        start: new Date('2023-01-30').setHours(20, 0, 0),
      },
      {
        title: 'Grupa początkująca',
        start: new Date('2023-02-1').setHours(17, 0, 0),
      },
      {
        title: 'Grupa średniozaawansowana',
        start: new Date('2023-02-1').setHours(18, 30, 0),
      },
      {
        title: 'Grupa zawansowana',
        start: new Date('2023-02-1').setHours(20, 0, 0),
      },
      {
        title: 'Grupa początkująca',
        start: new Date('2023-02-3').setHours(17, 0, 0),
      },
      {
        title: 'Grupa średniozaawansowana',
        start: new Date('2023-02-3').setHours(18, 30, 0),
      },
      {
        title: 'Grupa zawansowana',
        start: new Date('2023-02-3').setHours(20, 0, 0),
      },
      {
        title: 'Grupa początkująca',
        start: new Date('2023-02-6').setHours(17, 0, 0),
      },
      {
        title: 'Grupa średniozaawansowana',
        start: new Date('2023-02-6').setHours(18, 30, 0),
      },
      {
        title: 'Grupa zawansowana',
        start: new Date('2023-02-6').setHours(20, 0, 0),
      },
      {
        title: 'Grupa początkująca',
        start: new Date('2023-02-8').setHours(17, 0, 0),
      },
      {
        title: 'Grupa średniozaawansowana',
        start: new Date('2023-02-8').setHours(18, 30, 0),
      },
      {
        title: 'Grupa zawansowana',
        start: new Date('2023-02-8').setHours(20, 0, 0),
      },
      {
        title: 'Grupa początkująca',
        start: new Date('2023-02-10').setHours(17, 0, 0),
      },
      {
        title: 'Grupa średniozaawansowana',
        start: new Date('2023-02-10').setHours(18, 30, 0),
      },
      {
        title: 'Grupa zawansowana',
        start: new Date('2023-02-10').setHours(20, 0, 0),
      },

    ],
    locales: [plLocale],
    locale: 'pl',
  };
  constructor() {}

  ngOnInit(): void {}
}
