import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-etiqueta-valor',
  templateUrl: './etiqueta-valor.component.html',
  styleUrls: ['./etiqueta-valor.component.scss'],
})
export class EtiquetaValorComponent {
  @Input() etiqueta!: string | null | undefined;
  @Input() valor!: string | number | null | undefined;

    // Método para determinar el ancho del input basado en la etiqueta
    /* getInputWidth(etiqueta: string): string {
      if (etiqueta === 'Código') {
        return '98px';
      } else if (etiqueta === 'Nombre') {
        return '400px';
      }
      return 'auto'; 
    } */
}
