import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular'; // Importa el controlador de alertas

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  cliente = {
    nombre: '',
    apellido: '',
    edad: null
  };

  eventos = [
    { nombre: 'Cine', precio: 1000 },
    { nombre: 'Evento', precio: 2000 },
    { nombre: 'Deporte', precio: 1500 },
    { nombre: 'Concierto', precio: 2500 }
  ];

  eventoSeleccionado: { nombre: string; precio: number } | null = null;
  cantidadEntradas = 1;
  totalPagar = 0;

  constructor(private alertController: AlertController) {}

  
  calcularDescuento(precioBase: number, edad: number): number {
    let descuento = 0;
    if (edad < 18) {
      descuento = 0.10; 
    } else if (edad > 60) {
      descuento = 0.20; 
    }
    return precioBase * (1 - descuento); 
  }

  
  async comprarEntradas() {
    if (!this.eventoSeleccionado || !this.cantidadEntradas || !this.cliente.nombre || !this.cliente.apellido || !this.cliente.edad) {

      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, complete todos los campos.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

   
    const precioBase = this.eventoSeleccionado.precio * this.cantidadEntradas;
    const precioConDescuento = this.calcularDescuento(precioBase, this.cliente.edad);
    this.totalPagar = precioConDescuento;


    const alert = await this.alertController.create({
      header: 'Compra exitosa',
      message: `Has comprado ${this.cantidadEntradas} entradas para ${this.eventoSeleccionado.nombre}.\n` +
                `Total a pagar: ${this.totalPagar.toFixed(2)}.\n` +
                `Descuento aplicado: ${(precioBase - precioConDescuento).toFixed(2)}.`,
      buttons: ['OK']
    });

    await alert.present();
  }

 
  limpiarFormulario() {
    this.cliente = { nombre: '', apellido: '', edad: null };
    this.eventoSeleccionado = null;
    this.cantidadEntradas = 1;
    this.totalPagar = 0;
  }
}