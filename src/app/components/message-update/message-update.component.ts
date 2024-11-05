import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
  selector: 'app-message-update',
  templateUrl: './message-update.component.html',
  styleUrls: ['./message-update.component.css']
})
export class MessageUpdateComponent {
  @Input() estado: 'sin-guardar' | 'enviar' | 'guardado' = 'sin-guardar';
  @Output() onEnviar = new EventEmitter<void>();

  mensaje: string = 'Cambios no guardados';
  iconoClase: string = 'icono-cambios';
  estadoClase: string = 'cambio-sin-guardar';


    // Cambia el mensaje y estilo según el estado actual
  ngOnChanges() {
    if (this.estado === 'sin-guardar') {
      this.mensaje = 'Cambios no guardados';
      this.iconoClase = 'icono-cambios';
      this.estadoClase = 'cambio-sin-guardar';
    } else if (this.estado === 'enviar') {
      this.mensaje = 'Enviar cambios';
      this.iconoClase = 'icono-enviar';
      this.estadoClase = 'enviar-cambios';
    } else if (this.estado === 'guardado') {
      this.mensaje = 'Cambios guardados';
      this.iconoClase = 'icono-guardado';
      this.estadoClase = 'cambio-guardado';
    }
  }

  // Cambia el estado al pasar el mouse por encima
  hoverEnviar() {
    if (this.estado === 'sin-guardar') {
      this.estado = 'enviar';
      this.ngOnChanges();
    }
  }

  hoverSalir() {
    if (this.estado === 'enviar') {
      this.estado = 'sin-guardar';
      this.ngOnChanges();
    }
  }

  enviarCambios() {
    this.onEnviar.emit();
  }

}
