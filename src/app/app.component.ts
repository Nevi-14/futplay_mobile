import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';
import { UserService } from './services/user.service';
import { ClubService } from './services/club.service';
import { CalendarService } from './services/calendar.service';
import { PosicionesService } from './services/posiciones.service';
import { SolicitudesService } from './services/solicitudes.service';
import { JugadoresService } from './services/jugadores.service';
import { ProvinciasService } from './services/provincias.service';
import { RolesService } from './services/roles.service';
import { CantonesService } from './services/cantones.service';
import { DistritosService } from './services/distritos.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  currentYear: number=new Date().getFullYear();
  year =  new Date().getFullYear();
  month = new Date().getMonth()+1;
  constructor( private data: DataService, private user: UserService,private club:  ClubService, private calendar: CalendarService, private posicion: PosicionesService, private solicitudes: SolicitudesService, private jugadores: JugadoresService, private provincia: ProvinciasService, private roles: RolesService, private cantones: CantonesService, private distritos: DistritosService) {}

  ngOnInit(){
    this.calendar.getDays();
    this.calendar.getMonths();
    this.club.getClubs();
    this.club.getClubs();
    this.roles.getRoles();
this.posicion.getPosiciones();
    this.provincia.getProvincias();
    this.cantones.getCantones();
    this.distritos.getDistritos();
    this.user.getUsers();
    this.jugadores.getJugadores();
    this.solicitudes.getSolicitudes();
    console.log(this.user.user);
  }

  ngAfterViewInit(){
 
  }

}
