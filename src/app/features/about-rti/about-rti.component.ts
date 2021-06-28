import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about-rti',
  templateUrl: './about-rti.component.html',
  styleUrls: ['./about-rti.component.scss']
})
export class AboutRtiComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  apply(){
    this.router.navigate(['/apply']);
  }
}
