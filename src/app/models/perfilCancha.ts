export class PerfilCancha {
    constructor(
 
public cancha : {
    Cod_Cancha: number,
    Cod_Usuario: number,
    Cod_Categoria: number,
    Cod_Provincia: number,
    Cod_Canton: number,
    Cod_Distrito: number,
    Foto:string,
    Nombre: string,
    Numero_Cancha: number,
    Telefono: string,
    Precio_Hora: number,
    Luz: boolean,
    Precio_Luz: number,
    Techo: boolean,
    Latitud: number,
    Longitud: number,
    Estado: boolean,
    Descripcion_Estado: string,
    created_at: string,
    updated_at: string

},
public horario: [{
    Cod_Horario: number,
    Cod_Cancha: number,
    Cod_Dia: number,
    Hora_Inicio: number,
    Hora_Fin: number,
    Estado: boolean,

}],
public provincia:string,
public canton:string,
public distrito:string,
public categoria:string,
public correo:string,
    ){}
    
    }