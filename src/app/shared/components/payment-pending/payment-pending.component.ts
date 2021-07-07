import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-payment-pending',
  templateUrl: './payment-pending.component.html',
  styleUrls: ['./payment-pending.component.scss']
})
export class PaymentPendingComponent implements OnInit {
  applicationId: string;
  constructor(
    private route: ActivatedRoute,
    private api: ApiService

  ) {
   }

  ngOnInit(): void {
    this.applicationId = localStorage.getItem('applicationId');
  }
  payNow(){

  }
}
