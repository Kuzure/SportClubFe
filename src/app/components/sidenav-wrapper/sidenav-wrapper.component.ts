import { Component } from '@angular/core';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav-wrapper',
  templateUrl: './sidenav-wrapper.component.html',
  styleUrls: ['./sidenav-wrapper.component.scss'],
})
export class SidenavWrapperComponent {
  constructor(
    private tokenStorage: TokenStorageService,
  ) {}
  isExpanded: boolean = true;
  public get isLogin() {
    if (this.tokenStorage.get('Token') != null) {
      return true;
    }
    return false;
  }
  public logOut() {
    this.tokenStorage.remove('Token');
  }
}
