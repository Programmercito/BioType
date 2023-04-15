import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WorldService {
  private world: number[][] = [];
  constructor() { }
  private getWorld() {
    return this.world;
  }
  public llena() {
    for (let i = 0; i < 500; i++) {
      this.world[i] = [];
      for (let j = 0; j < 500; j++) {
        this.world[i][j] = 0;
      }
    }
  }
  public imprime() {
    console.log(this.world);
  }
  public llenaEnte() {
    let cantidad = Math.floor(Math.random() * 51) + 50;
    for (let k = 0; k < cantidad; k++) {
      // generar un número aleatorio entre 1 y 100 para el valor a agregar
      let valor = Math.floor(Math.random() * 100) + 1;

      let fila = Math.floor(Math.random() * 500);
      let columna = Math.floor(Math.random() * 500);
      // generar dos números aleatorios entre 0 y 499 para los índices de la matriz
      while (this.world[fila][columna] !== 0) {
        // generar otros índices aleatorios
        fila = Math.floor(Math.random() * 500);
        columna = Math.floor(Math.random() * 500);
      }

      // asignar el valor a la posición de la matriz
      this.world[fila][columna] = valor;
    }
  }
  public dibuja(ctx: any) {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 999, 999);
    ctx.fillStyle = 'black';
    for (let x = 0; x < 500; x++) {
      for (let y = 0; y < 500; y++) {
        let valor = this.world[x][y];
        if (valor > 0) {
          ctx.fillRect(x * 2, y * 2, 2, 2);
        }
      }
    }

  }
}
