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

  constructor(
    private apiService: ApiService,
    public translate: TranslateService
  ) {
    translate.addLangs(["English", "Telugu"]);
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
    if(this.apiService.logged){
      this.logged = true;
    }
    this.apiService.menuAfterLogin.subscribe(
      value => { this.logged = value }
    )
  }

  ngAfterContentInit(){
    if (this.apiService.logged) {
      this.logged = true;
      if (localStorage.getItem('user') != null) {
        const userData: any = JSON.parse(localStorage.getItem('user'))
        console.log(typeof userData)
        if (Array.isArray(userData)) {
          this.userName = userData[0].username;
        } else if (typeof userData === 'object') {
          this.userName = userData.username;
          console.log(this.userName)
        }
      }
    }
  }

  logout() {
    this.apiService.logout();
    this.apiService.menuFlag(false);
  }
}
