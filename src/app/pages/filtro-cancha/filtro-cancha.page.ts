import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CanchasService } from 'src/app/services/canchas.service';
import { CantonesService } from 'src/app/services/cantones.service';
import { CategoriaCanchasService } from 'src/app/services/categoria-canchas.service';
import { DistritosService } from 'src/app/services/distritos.service';
import { ListaCanchasService } from 'src/app/services/lista-canchas.service';
import { ProvinciasService } from 'src/app/services/provincias.service';

@Component({
  selector: 'app-filtro-cancha',
  templateUrl: './filtro-cancha.page.html',
  styleUrls: ['./filtro-cancha.page.scss'],
})
export class FiltroCanchaPage implements OnInit {
  filtro ={
    Cod_Provincia: 0,
    Cod_Canton: 0,
    Cod_Distrito: 0,
    Cod_Categoria: 0
  }
  constructor(
    public provinciasService: ProvinciasService,
    public cantonesService: CantonesService,
    public distritosService: DistritosService,
    public modalCtrl: ModalController,
    public listaCanchasService: ListaCanchasService,
    public canchasService: CanchasService,
    public categoriaCanchasService: CategoriaCanchasService,
    public cdr: ChangeDetectorRef

  ) { }

  ngOnInit() {
    this.cdr.detectChanges();
this.categoriaCanchasService.syncCategoriaCanchas();
    this.provinciasService.syncProvincias();

  }

  submit(){
    this.cerrarModal();
    this.cdr.detectChanges();
    this.canchasService.syncfiltrarCanchas(
      
      this.filtro.Cod_Provincia,
      this.filtro.Cod_Canton,
      this.filtro.Cod_Distrito,
      this.filtro.Cod_Categoria
    )
  }
    onChange($event , provincia, canton, distrito){
    if(provincia){
  
   this.cantonesService.syncCantones($event.target.value);
    }else if(canton){
  
      this.distritosService.syncDistritos(this.filtro.Cod_Provincia, $event.target.value);
  
    }else{
      
    }
    console.log($event.target.value);
    }

    cerrarModal(){
      this.modalCtrl.dismiss();
    }
}
