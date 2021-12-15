import { Time } from "@angular/common";

export class Reservaciones {
    constructor(
      public reservacionID: number,
      public canchaID: number,
      public usuarioID: number,
      public equipoID1: number,
      public equipoID2: number,
      public titulo: string,
      public descripcion: string,
      public confirmacion1: boolean,
      public confirmacion2: boolean,
      public estado: string,
      public fecha: Date,
      public horaInicio: Time,
      public horaFin: Time,
    ){}
}