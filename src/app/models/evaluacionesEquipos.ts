export class EvaluacionesEquipos{
    constructor(
        public evaluacionID: number,
        public reservacionID: number,
        public equipoID: number,
        public estrellas: number,
        public evaluacion: string,
        public dureza: string
    ){}
}