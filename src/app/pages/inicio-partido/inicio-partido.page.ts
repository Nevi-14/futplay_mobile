import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { partidos } from 'src/app/models/partidos';
import { PerfilReservaciones } from 'src/app/models/perfilReservaciones';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-inicio-partido',
  templateUrl: './inicio-partido.page.html',
  styleUrls: ['./inicio-partido.page.scss'],
})
export class InicioPartidoPage implements OnInit {
  @Input() reto: PerfilReservaciones
  @Input() partido: partidos[]
  constructor(
    public usuariosService:UsuariosService,
    public modalCtrl:ModalController



  ) { }

  ngOnInit() {

 
      }



      verificarPuntos(){


      }

 evaluacionIndividual(){

 }
    
sumarMarcadorRival(){

}
  
restarMarcadorRival(){


}

sumarMarcadorRetador(){


}

restarMarcadorRetador(){


}

cerrarModal(){

this.modalCtrl.dismiss();
}
}