import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  logged: boolean;
  constructor(
    private apiService: ApiService
  ) { } 

  ToggleNavBar() {
    let element: HTMLElement = document.getElementsByClassName('navbar-toggler')[0] as HTMLElement;
    if (element.getAttribute('aria-expanded') == 'true') {
      element.click();
    }
  }

  ngOnInit(): void {
    if(localStorage.getItem('access-token') != null){
      this.logged = true;
    }
    this.apiService.menuAfterLogin.subscribe(
      value => {this.logged = value}
    )
  }
  logout(){
    localStorage.removeItem('access-token')
    localStorage.removeItem('user')
    this.apiService.menuFlag(false);
  }

}
