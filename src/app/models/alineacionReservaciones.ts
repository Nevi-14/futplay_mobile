export class AlineacionReservaciones{
    constructor(
        public aleneacionID: number,
        public reservacionID: number,
        public  equipoID: number,
        public jugadorID: number,
        public goles: number,
        public evaluacion: string
    ){

    }
}