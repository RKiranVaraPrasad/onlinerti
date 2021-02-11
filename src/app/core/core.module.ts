import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';



import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ContentWrapperComponent } from './components/content-wrapper/content-wrapper.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [NavbarComponent, FooterComponent, PageNotFoundComponent, ContentWrapperComponent],
  imports: [
    CommonModule, CarouselModule.forRoot(),
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    NavbarComponent, FooterComponent, ContentWrapperComponent
  ]
})
export class CoreModule { }
