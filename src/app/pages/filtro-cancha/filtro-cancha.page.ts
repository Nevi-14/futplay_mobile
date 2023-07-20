import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { CategoriaCanchasService } from '../../services/categoria-canchas.service';
import { ModalController } from '@ionic/angular';
import { CanchasService } from '../../services/canchas.service';


@Component({
  selector: 'app-filtro-cancha',
  templateUrl: './filtro-cancha.page.html',
  styleUrls: ['./filtro-cancha.page.scss'],
})
export class FiltroCanchaPage implements OnInit {
  @Input() Cod_Provincia:number;
  @Input() Cod_Canton:number;
  @Input() Cod_Distrito:number;
  @Input() Cod_Categoria:number;
  filtro ={
    Cod_Provincia: null,
    Cod_Canton: null,
    Cod_Distrito: null,
    Cod_Categoria: null
  }
  constructor(
    public categoriasCanchasService:CategoriaCanchasService,
    public modalCtrl: ModalController ,
    public canchasService:CanchasService

  ) { }

  ngOnInit() {


 
  }




  onChangeDistritos($event){

    this.filtro.Cod_Distrito = $event.target.value;

  }
  limpiarDatos(){
    this.filtro ={
      Cod_Provincia: null,
      Cod_Canton: null,
      Cod_Distrito: null,
      Cod_Categoria: null
    }
    this.canchasService.syncListaCanchasToPromise().then(canchas=>{

      this.canchasService.canchas = canchas;
      this.cerrarModal();
    })
  }
  onOpenMenu(cancha){

  }
  submit(){
    //this.cerrarModal();

    this.canchasService.syncFintroListaCanchasToPromise(this.filtro).then(canchas=>{

      this.canchasService.canchas = canchas;
      this.cerrarModal();
    })
  }
 
  cerrarModal(){
    console.log(this.filtro,'cerrar fil')
    this.modalCtrl.dismiss({

      'Cod_Provincia':this.filtro.Cod_Provincia,
      'Cod_Canton':this.filtro.Cod_Canton,
      'Cod_Distrito':this.filtro.Cod_Distrito,
      'Cod_Categoria':this.filtro.Cod_Categoria
    });
  }
}
