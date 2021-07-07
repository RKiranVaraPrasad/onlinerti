import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {
  applicationId: string;
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.applicationId = localStorage.getItem('applicationId');
  }
  trackApplication(){
    this.router.navigate(['/track-application'])
  }
}
