import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyRtiComponent } from './my-rti.component';

const routes: Routes = [
  { path: 'my-rti', component: MyRtiComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyRtiRoutingModule { }
