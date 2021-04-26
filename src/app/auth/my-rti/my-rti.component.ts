import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-my-rti',
  templateUrl: './my-rti.component.html',
  styleUrls: ['./my-rti.component.scss']
})
export class MyRtiComponent implements OnInit {
  username: any;
  applyData: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {

  }

  ngOnInit(): void {
    const userData = JSON.parse(localStorage.getItem('user'))
    this.username = userData.username;
    let email = userData.email;
    this.apiService.getPersonalDetailByEmailService(email)
      .subscribe(
        (resultID: any) => {
          console.log(resultID)
          this.apiService.getMyRtiService(resultID[0].id)
            .subscribe(
              data => {
                console.log(data)
                this.applyData = data;
              }
            )
        }
      )

  }

  seeDetails() {
    this.router.navigate(['/details'], { relativeTo: this.route })
  }


}
