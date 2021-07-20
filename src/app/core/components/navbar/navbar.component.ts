import { Component, OnInit, AfterContentInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, AfterContentInit {
  logged: boolean;
  userName: string;
  adminLogged: boolean;
  userData = this.apiService.userName;

  constructor(
    private apiService: ApiService,
    public translate: TranslateService
  ) {
    translate.addLangs(["English"]); //, "Telugu"
    translate.setDefaultLang('English');
    let browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/English|Telugu/) ? browserLang : 'English');
  }

  ToggleNavBar() {
    let element: HTMLElement = document.getElementsByClassName('navbar-toggler')[0] as HTMLElement;
    if (element.getAttribute('aria-expanded') == 'true') {
      element.click();
    }
  }

  ngOnInit(): void {
    this.apiService.userDataAfterLoggedIn.subscribe((user) => {
      this.userData = user;
    })
    if (this.userData) {
      if (Array.isArray(this.userData)) {
        this.userName = this.userData[0].username;
      } else if (typeof this.userData === 'object') {
        this.userName = this.userData.username;
      }
    }
    if (this.userData) {
      this.apiService.logged.subscribe(
        status => {
          if (status === true) {
            this.apiService.userData.subscribe(
              data => {
                console.log(data)
                if (data) {
                  if (data.user.role.type === 'admin') {
                    this.adminLogged = true;
                  }
                  if (data.user.role.type === 'authenticated') {
                    this.adminLogged = false;
                  }
                }
              })
          }
        }
      )
    }

  }

  ngAfterContentInit() {
    if (this.userData) {
      if (Array.isArray(this.userData)) {
        this.userName = this.userData[0].username;
      } else if (typeof this.userData === 'object') {
        this.userName = this.userData.username;
      }
    }
  }

  logout() {
    this.apiService.logout();
  }
}
