import { Injectable } from '@angular/core';
import { Ser } from './ser';

@Injectable({
  providedIn: 'root'
})
export class WorldService {
  public vive() {
    this.entes.forEach((ente, indice) => {
      // registrando posibles
      this.posibles = [];
      this.otros = [];
      let nuevox = ente.x;
      let nuevoy = ente.y;
      let dale = false;
      nuevox = ente.x + 1;
      nuevoy = ente.y + 1;
      if (nuevox < 500 && nuevoy < 500) {
        this.posibles.push({ x: nuevox, y: nuevoy, camino: 1 });
      }
      nuevoy = ente.y + 1;
      nuevox = ente.x;
      if (nuevoy < 500) {
        this.posibles.push({ x: nuevox, y: nuevoy, camino: 2 });
      }
      nuevox = ente.x + 1;
      nuevoy = ente.y;
      if (nuevox < 500) {
        this.posibles.push({ x: nuevox, y: nuevoy, camino: 3 });
      }
      nuevox = ente.x - 1;
      nuevoy = ente.y + 1;
      if (nuevox > 0 && nuevoy < 500) {
        this.posibles.push({ x: nuevox, y: nuevoy, camino: 4 });
      }
      nuevox = ente.x + 1;
      nuevoy = ente.y - 1;
      if (nuevoy > 0 && nuevox < 500) {
        this.posibles.push({ x: nuevox, y: nuevoy, camino: 5 });
      }
      nuevoy = ente.y - 1;
      nuevox = ente.x;
      if (nuevoy > 0) {
        this.posibles.push({ x: nuevox, y: nuevoy, camino: 6 });
      }
      nuevox = ente.x - 1;
      nuevoy = ente.y;
      if (nuevox > 0) {
        this.posibles.push({ x: nuevox, y: nuevoy, camino: 7 });
      }
      nuevox = ente.x - 1;
      nuevoy = ente.y - 1;
      if (nuevox > 0 && nuevoy > 0) {
        this.posibles.push({ x: nuevox, y: nuevoy, camino: 8 });
      }
      //se recorre el array para saber si hay mas al lado
      this.posibles.forEach(element => {
        if (this.world[element.x][element.y] != 0) {
          this.otros.push(element);
        }
      });
      if (this.otros.length > 0) {
        //posible pelea
      } else {
        //moverme
        let ele = this.escogeUno(this.posibles);
        let este: Ser;
        este = this.world[ente.x][ente.y];
        this.world[ente.x][ente.y] = 0;
        //este.anterior = 0;
        this.world[ele.x][ele.y] = este;
        this.entes[indice] = { x: ele.x, y: ele.y };
      }
    });
  }
  private world: any[][] = [];
  private entes: any[] = [];
  private aux: any[] = [];
  private posibles: any[] = [];
  private otros: any[] = [];
  constructor() { }
  private getWorld() {
    return this.world;
  }
  public escogeUno(aqui: any[]) {
    let indice = Math.floor(Math.random() * aqui.length);
    let elemento = aqui[indice];
    return elemento;
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
    let cantidad;
    //cantidad = 2;
    cantidad = Math.floor(Math.random() * 1201) + 1200;
    for (let k = 0; k < cantidad; k++) {
      // generar un número aleatorio entre 1 y 100 para el valor a agregar
      let valor = Math.floor(Math.random() * 100) + 1;

      let fila = Math.floor(Math.random() * 500);
      let columna = Math.floor(Math.random() * 500);
      // generar dos números aleatorios entre 0 y 499 para los índices de la matriz
      while (this.world[fila][columna] != 0) {
        // generar otros índices aleatorios
        fila = Math.floor(Math.random() * 500);
        columna = Math.floor(Math.random() * 500);
      }
      // asignar el valor a la posición de la matriz
      this.world[columna][fila] = new Ser();
      this.entes.push({ x: columna, y: fila });
    }
  }
  public dibuja(ctx: any) {
    //ctx.fillStyle = 'white';
    //ctx.fillRect(0, 0, 999, 999);
    //ctx.fillStyle = 'white';
    //ctx.fillRect(1, 1, 50000, 50000);

    let ancho = 15;
    for (let x = 0; x < 500; x++) {
      for (let y = 0; y < 500; y++) {
        let valor = this.world[x][y];
        if (valor != 0) {
          ctx.fillStyle = 'yellow';
          ctx.fillRect((x * ancho), (y * ancho), ancho, ancho);
          ctx.fillStyle = 'black';
          ctx.fillRect((x * ancho) + 2, (y * ancho) + 2, ancho - 4, ancho - 4);
          ctx.fillRect((x * ancho) + 7, (y * ancho), 1, ancho);
          ctx.fillRect((x * ancho), (y * ancho) + 7, ancho, 1);
          ctx.fillRect((x * ancho), (y * ancho), 2, 2);
          ctx.fillRect((x * ancho) + ancho - 2, (y * ancho), 2, 2);
          ctx.fillRect((x * ancho), (y * ancho) + ancho - 2, 2, 2);
          ctx.fillRect((x * ancho) + ancho - 2, (y * ancho)+ ancho - 2, 2, 2);

        } else {
          ctx.fillStyle = 'white';
          ctx.fillRect((x * ancho), (y * ancho), ancho, ancho);

        }


      }
    }

  }
}
