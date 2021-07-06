import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-payment-pending',
  templateUrl: './payment-pending.component.html',
  styleUrls: ['./payment-pending.component.scss']
})
export class PaymentPendingComponent implements OnInit {
  order_id: string;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService

  ) {
    this.order_id = localStorage.getItem('orderId');
   }

  ngOnInit(): void {
    this.api.getOrderByIdService(this.order_id)
    .subscribe(
      data => {
        console.log(data)
      }
    )
  }
  payNow(){

  }
}
