import { Pipe, PipeTransform } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertasService } from '../services/alertas.service';

@Pipe({
  name: 'validacionFormulario'
})
export class ValidacionFormularioPipe implements PipeTransform {
constructor(
public alertasService:AlertasService  
){}
 async transform(form:NgForm) {
    console.log(form,'form')
    let data = form.value;
    let continuar = true;
    Object.keys(data).forEach((key, index) => {
      let keyValue = data[key];
      if( index > 0 &&  keyValue === null || index > 0 &&   keyValue === undefined || index > 0 &&  keyValue === '') continuar = false;
    if(index == Object.keys(data).length -1){
     
    }
      });
      return continuar;
  }

}
