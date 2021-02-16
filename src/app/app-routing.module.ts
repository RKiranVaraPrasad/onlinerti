import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentWrapperComponent } from './core/components/content-wrapper/content-wrapper.component';

const routes: Routes = [
  { path: '', component: ContentWrapperComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
