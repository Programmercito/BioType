import { Component } from '@angular/core';
import { WorldService } from 'src/app/core/world.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent {
  canvas: any;
  intervalID: number;

  constructor(public world: WorldService) {
    this.intervalID = 0;
  }
  ngOnInit() {
    this.canvas = document.getElementById("canvas");
    let ctx = this.canvas.getContext('2d');
    // Comenzar una nueva ruta
    ctx.beginPath();
    this.world.llena();
    this.world.llenaEnte();
    this.world.dibuja(ctx);
    this.intervalID = window.setInterval(() => this.procesa(ctx), 1000);

  }
  public procesa(ctx: any) {
    this.world.vive();
    this.world.dibuja(ctx);
  }
  public detener() {
    window.clearInterval(this.intervalID);
  }
}
