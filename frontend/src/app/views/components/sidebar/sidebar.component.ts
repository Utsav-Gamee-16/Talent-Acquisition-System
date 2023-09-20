import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth/auth.service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const TagROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
  { path: '/candidates', title: 'Candidates',  icon:'groups', class: '' },
  { path: '/interviewers', title: 'Interviewers',  icon:'people', class: '' },
  { path: '/events', title: 'Event',  icon:'event', class: '' },
  { path: '/screening', title: 'Screening',  icon:'person_search', class: '' },
  { path: '/interviews', title: 'Interviews',  icon:'photo_camera_front', class: '' },
  { path: '/report', title: 'Report',  icon:'list_alt', class: '' },
];

export const InterviewerROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
  { path: '/interviews', title: 'Interviews',  icon:'photo_camera_front', class: '' },
  { path: '/evaluation', title: 'Evaluation',  icon:'view_timeline', class: '' },
  { path: '/report', title: 'Report',  icon:'list_alt', class: '' },
];

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/user-profile', title: 'Users',  icon:'person', class: '' },
    { path: '/candidates', title: 'Candidates',  icon:'groups', class: '' },
    { path: '/interviewers', title: 'Interviewers',  icon:'people', class: '' },
    { path: '/events', title: 'Events',  icon:'event', class: '' },
    { path: '/screening', title: 'Screening',  icon:'person_search', class: '' },
    { path: '/interviews', title: 'Interviews',  icon:'photo_camera_front', class: '' },
    { path: '/evaluation', title: 'Evaluation',  icon:'view_timeline', class: '' },
    { path: '/report', title: 'Report',  icon:'list_alt', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private authService : AuthService) { }

  userType : any;
  isInterviewer :boolean = false ;
  isAdmin : boolean = false;
  isTAG : boolean = false;

  ngOnInit() {

    this.userType = localStorage.getItem("userType");
    console.log(this.userType);
    if(this.userType == "interviewer")
    {
      this.isInterviewer = true;
      console.log("isInterviewer",this.isInterviewer);
    }
    else if(this.userType == "TAG"){
      this.isTAG = true;
      console.log("isTag",this.isTAG)
    }
    else if(this.userType == "Admin"){
      this.isAdmin = true;
      console.log("isAdmin",this.isAdmin)
    }
    
    if(this.isInterviewer == true){
      this.menuItems = InterviewerROUTES.filter(menuItem => menuItem);
    }
    else if(this.isTAG == true){
      this.menuItems = TagROUTES.filter(menuItem => menuItem);
    }
    else if(this.isAdmin == true){
      this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
    
  }
  
}
