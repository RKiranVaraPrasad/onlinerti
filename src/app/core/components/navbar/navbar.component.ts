import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  logged: boolean = false;
  constructor() { } 

  ToggleNavBar() {
    let element: HTMLElement = document.getElementsByClassName('navbar-toggler')[0] as HTMLElement;
    if (element.getAttribute('aria-expanded') == 'true') {
      element.click();
    }
  }

  ngOnInit(): void {
    if(localStorage.getItem('access-token') !== null){
      this.logged = false;
    }
  }
  logout(){
    localStorage.removeItem('access-token')
    localStorage.removeItem('user')
    this.logged = true;
  }

}
