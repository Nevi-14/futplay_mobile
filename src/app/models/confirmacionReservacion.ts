
export class ConfirmacionReservaciones{
constructor(
public Cod_Confirmacion : number,
public Cod_Reservacion: number,
public Cod_Retador : number,
public Cod_Rival : number,
public Confirmacion_Retador: boolean,
public Confirmacion_Rival : boolean,
public Cod_Estado:  number,
public Retador_Avatar:boolean,
public Rival_Avatar:boolean,
){

}
}{}