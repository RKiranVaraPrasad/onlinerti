import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-my-rti',
  templateUrl: './my-rti.component.html',
  styleUrls: ['./my-rti.component.scss']
})
export class MyRtiComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { 
    
  }

  ngOnInit(): void {
  }

  seeDetails(){
    this.router.navigate(['/details'], {relativeTo: this.route})
  }


}
