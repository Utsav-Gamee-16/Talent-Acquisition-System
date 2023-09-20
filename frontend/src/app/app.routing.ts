import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './services/auth/auth-guard.service';
import { AdminLayoutComponent } from './views/layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './views/login/login.component';

const routes: Routes =[
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    },
  }, 
  {
    path: '', canActivate : [AuthGuardService],
    component: AdminLayoutComponent,
    children: [
    {
      path: 'dashboard',
      loadChildren: () => import('./views/dashboard/dashboard.module').then( m => m.DashboardModule)
    },
    {
      path: 'user-profile',
      loadChildren: () => import('./views/user-profile/user-profile.module').then( m => m.UserProfileModule)
    },
    {
      path: 'interviews',
      loadChildren: () => import('./views/interviews/interviews.module').then( m => m.InterviewsModule)
    },
    {
      path: 'events',
      loadChildren: () => import('./views/events/events.module').then( m => m.EventsModule)
    },
    {
      path: 'candidates',
      loadChildren: () => import('./views/candidates/candidates.module').then( m => m.CandidatesModule)
    },
    {
      path: 'interviewer',
      loadChildren: () => import('./views/interviewer/interviewer.module').then( m => m.InterviewerModule)
    },
    {
      path: 'screening',
      loadChildren: () => import('./views/screening/screening.module').then( m => m.ScreeningModule)
    },
    {
      path: 'interviewers',
      loadChildren: () => import('./views/interviewer/interviewer.module').then( m => m.InterviewerModule)
    },
    {
      path: 'report',
      loadChildren: () => import('./views/report/report.module').then( m => m.ReportModule)
    },
    {

      path: 'evaluation',
      loadChildren: () => import('./views/evaluation/evaluation.module').then( m => m.EvaluationModule)
    }
  ]}
];

@NgModule({
  imports: [ 
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes , {
    onSameUrlNavigation: 'reload'
  })],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
