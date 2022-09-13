import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav-wrapper',
  templateUrl: './sidenav-wrapper.component.html',
  styleUrls: ['./sidenav-wrapper.component.scss'],
})
export class SidenavWrapperComponent implements OnInit {
  isExpanded: boolean = false;
  constructor() {}

  ngOnInit(): void {}
}
