import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdentifierComponent } from './components/identifier/identifier.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [
    IdentifierComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
  ],
  exports: [
    IdentifierComponent
  ]
})
export class SharedModule { }
