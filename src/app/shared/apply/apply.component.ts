import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.scss']
})
export class ApplyComponent implements OnInit {

  options: FormGroup;
  selectControl = new FormControl('accent');
  fontSizeControl = new FormControl(16, Validators.min(10));

  constructor(
    fb: FormBuilder
  ) {
    this.options = fb.group({
      color: this.selectControl,
      fontSize: this.fontSizeControl,
    });
   }

  ngOnInit(): void {
  }

  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  getFontSize() {
    return Math.max(10, this.fontSizeControl.value);
  }

}
