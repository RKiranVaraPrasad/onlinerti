import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { ApiService } from 'src/app/shared/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  rtiDetails: any;
  constructor(
    private location: Location,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    let service = this.route.snapshot.paramMap.get('service')
    let id = this.route.snapshot.paramMap.get('id')
    this.apiService.getAppliesService(id)
      .subscribe(
        (data: any) => {
          console.log(data)
          let rtiId = data.rtiDetailsId;
          console.log(rtiId)
          this.apiService.getRtiDetailsService(service, rtiId)
            .subscribe(
              data => {
                this.rtiDetails = data;
                console.log(data)
              }
            )
        }
      )

  }

  back() {
    this.location.back()
  }

}
