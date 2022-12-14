import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ProvinciasService } from '../../services/provincias.service';
import { CantonesService } from '../../services/cantones.service';
import { DistritosService } from '../../services/distritos.service';
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
    public provinciasService:ProvinciasService,
    public cantonesService:CantonesService,
    public distritosService:DistritosService,
    public categoriasCanchasService:CategoriaCanchasService,
    public modalCtrl: ModalController ,
    public canchasService:CanchasService

  ) { }

  ngOnInit() {

  
    this.categoriasCanchasService.categoria_canchas = [];
    this.categoriasCanchasService.syncCategoriaCanchasToPromise().then(resp =>{
      this.categoriasCanchasService.categoria_canchas = resp.slice(0);
      this.filtro.Cod_Categoria = this.Cod_Categoria;
      this.provinciasService.provincias = [];
      this.cantonesService.cantones = [];
      this.provinciasService.syncProvinciasPromise().then(resp =>{
    
        this.provinciasService.provincias = resp.slice(0);
        this.filtro.Cod_Provincia = this.Cod_Provincia;
        if(this.filtro.Cod_Provincia){
          this.cantonesService.syncCantones(this.filtro.Cod_Provincia).then(resp =>{
      
        this.cantonesService.cantones = resp.slice(0);
    
        this.filtro.Cod_Canton = this.Cod_Canton;
    
        if(this.filtro.Cod_Canton){
          this.distritosService.distritos = [];
          this.distritosService.syncDistritos(this.filtro.Cod_Canton).then(resp =>{
            this.distritosService.distritos = resp.slice(0);
            this.filtro.Cod_Distrito = this.Cod_Distrito;
            
          })
        }
      
          })
      
      
        
        }
    
    
      
        
    
      })
    
    
    });
 
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
 }
  }

  onChangeCantones($event){

    this.filtro.Cod_Canton = $event.target.value;
    this.filtro.Cod_Distrito = null;
    this.distritosService.distritos = [];
if(this.filtro.Cod_Provincia && this.filtro.Cod_Canton){
  this.distritosService.syncDistritos(this.filtro.Cod_Canton).then(resp =>{
    this.distritosService.distritos = resp.slice(0);

    
  })
}

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
