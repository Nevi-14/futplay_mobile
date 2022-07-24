import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
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
    Cod_Provincia: null,
    Cod_Canton: null,
    Cod_Distrito: null,
    Cod_Categoria: null
  }
  @Input() Cod_Provincia:number;
  @Input() Cod_Canton:number;
  @Input() Cod_Distrito:number;
  @Input() Cod_Categoria:number;
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

this.categoriaCanchasService.categoria_canchas = [];
this.categoriaCanchasService.syncCategoriaCanchasToPromise().then(resp =>{
  this.categoriaCanchasService.categoria_canchas = resp.slice(0);
  this.provinciasService.syncProvincias();
  this.cantonesService.cantones = [];
  this.cantonesService.syncCantones(this.filtro.Cod_Provincia).then(resp =>{
 this.cantonesService.cantones = resp.slice(0);
 this.distritosService.distritos = [];
 this.distritosService.syncDistritos(this.filtro.Cod_Provincia,this.filtro.Cod_Canton).then(resp =>{
  this.distritosService.distritos = resp.slice(0);
  this.filtro.Cod_Provincia = this.Cod_Provincia;
  this.filtro.Cod_Canton = this.Cod_Canton;
  this.filtro.Cod_Distrito = this.Cod_Distrito;
  this.filtro.Cod_Categoria = this.Cod_Categoria;
  console.log('filtro', this.filtro)
  this.cdr.detectChanges();
  
})



  });


});



  }

  submit(){
    this.cerrarModal();
    return
    this.cdr.detectChanges();
    this.canchasService.syncfiltrarCanchas(
      
      this.filtro.Cod_Provincia,
      this.filtro.Cod_Canton,
      this.filtro.Cod_Distrito,
      this.filtro.Cod_Categoria
    )
  }
  

    onChangeProvincias($event){
  
      this.filtro.Cod_Provincia = $event.target.value;
      this.filtro.Cod_Canton = null;
      this.filtro.Cod_Distrito = null;
      this.cantonesService.cantones = [];
      this.distritosService.distritos = [];
   if(this.filtro.Cod_Provincia){
    this.cantonesService.syncCantones(this.filtro.Cod_Provincia).then(resp =>{

  this.cantonesService.cantones = resp.slice(0);

    })
   }else{

   }
    }

    onChangeCantones($event){
  
      this.filtro.Cod_Canton = $event.target.value;
      this.filtro.Cod_Distrito = null;
      this.distritosService.distritos = [];
  if(this.filtro.Cod_Provincia && this.filtro.Cod_Canton){
    this.distritosService.syncDistritos(this.filtro.Cod_Provincia,this.filtro.Cod_Canton).then(resp =>{
      this.distritosService.distritos = resp.slice(0);
  
      
    })
  }else{
 
  }
  
    }
  
    onChangeDistritos($event){
  
      this.filtro.Cod_Distrito = $event.target.value;
  
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
