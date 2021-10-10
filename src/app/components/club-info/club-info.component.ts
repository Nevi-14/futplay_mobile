import { Component, OnInit, Input } from '@angular/core';
import { Club } from 'src/app/models/club';
import { UserService } from '../../services/user.service';
import { SolicitudesService } from '../../services/solicitudes.service';
import { ModalController, PopoverController } from '@ionic/angular';
import { JugadoresService } from '../../services/jugadores.service';

@Component({
  selector: 'app-club-info',
  templateUrl: './club-info.component.html',
  styleUrls: ['./club-info.component.scss'],
})
export class ClubInfoComponent implements OnInit {
  @Input() club: Club;
  constructor(private modalCtrl: ModalController,private popoverCtrl: PopoverController, private jugadores: JugadoresService, private solicitudes: SolicitudesService, private usuario: UserService) { }

  ngOnInit() {
 
    console.log(this.club)
  }

}
