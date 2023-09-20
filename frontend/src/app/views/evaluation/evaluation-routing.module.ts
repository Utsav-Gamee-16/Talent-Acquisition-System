import { NgModule } from '@angular/core';
import { EvaluationComponent } from '../evaluation/evaluation.component';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {
    path: '',
    component: EvaluationComponent,
    data: {
      title: 'Evaluation'
    }
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvaluationRoutingModule { }
