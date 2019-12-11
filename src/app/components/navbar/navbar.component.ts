import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/services/auth.service';
import { MenuItem } from 'primeng/api/menuitem';
import { Store } from '@ngrx/store';
import { AppState } from '@app/store/app-store.module';
import { LogoutUser } from '@app/store/actions/auth.action';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  items: MenuItem[] = [
    {
      label: 'Home',
      routerLink: ['/'],
      icon: 'fa fa-home'
    }
  ];

  get isAuth() {
    return !!this.authService.token;
  }

  constructor(
    private router: Router,
    private authService: AuthService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
  }

  logout() {
    if (this.isAuth) {
      this.store.dispatch(new LogoutUser());
    }
    this.router.navigate(['/auth']);
  }
}
