import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';
import { UserService } from './services/users/user.service';
import { ClubService } from './services/club.service';
import { CalendarService } from './services/calendar.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  currentYear: number=new Date().getFullYear();
  year =  new Date().getFullYear();
  month = new Date().getMonth()+1;
  constructor( private data: DataService, private user: UserService,private club:  ClubService, private calendar: CalendarService) {}

  ngOnInit(){ 
    this.calendar.getDays();
    this.calendar.getMonths();
    this.club.getClubs();
    this.club.getClubs();
    this.data.getRoles();
    this.data.getProvincias();
    this.data.getCantones();
    this.data.getDistritos();
    this.user.addUsers();

  }

  ngAfterViewInit(){
 
  }

}
