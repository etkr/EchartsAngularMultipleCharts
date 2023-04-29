import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingleDatasetComponent } from './single-dataset/single-dataset.component';
import { MultipleDatasetComponent } from './multiple-dataset/multiple-dataset.component';

const routes: Routes = [
  { path: 'single-dataset', component: SingleDatasetComponent },
  { path: 'multiple-dataset', component: MultipleDatasetComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
