export class Ser {
    public id: number;
    public fuerza:number;
    public hambre:number;
    
    constructor() {
        this.id = 0;
        this.fuerza=Math.floor(Math.random() * 51) + 50;
        this.hambre=Math.floor(Math.random() * 50) ;
    }
}