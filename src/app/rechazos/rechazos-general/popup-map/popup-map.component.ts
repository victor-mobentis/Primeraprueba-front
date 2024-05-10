import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy, ElementRef } from '@angular/core';
import { Map, NavigationControl, Marker } from 'maplibre-gl';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-popup-map',
  templateUrl: './popup-map.component.html',
  styleUrls: ['./popup-map.component.css']
})
export class PopupMapComponent implements OnInit, AfterViewInit, OnDestroy {
  map: Map | undefined;
  markers: Marker[] = []; // Array para almacenar los marcadores

  constructor(
    public dialogRef: MatDialogRef<PopupMapComponent>,
    public dialog: MatDialog
  ){}

  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    if (this.mapContainer) {
      const initialState = { lng: -5.8447, lat: 43.3614 }; // Coordenadas iniciales en el centro de Oviedo

      // Crea el mapa de MapTiler en el elemento div
      this.map = new Map({
        container: this.mapContainer.nativeElement,
        style: 'https://api.maptiler.com/maps/basic-v2/style.json?key=36bBxm9qzcAM0x9cGbYq', /* cambia el estilo que quieras usar para el estilo del mapa */
        center: [initialState.lng, initialState.lat],
        zoom: 14
      });
  
      // Itera sobre todas las coordenadas de Oviedo y agrega un marcador para cada una
      const oviedoCoords = [
        { lng: -5.8447, lat: 43.3614 },
        { lng: -5.8545, lat: 43.3603 },
        { lng: -5.8434, lat: 43.3661 },
        { lng: -5.8457, lat: 43.3608 },
        { lng: -5.8709, lat: 43.3653 }
      ];

      oviedoCoords.forEach(coord => {
        if (this.map) { // Verifica que this.map no sea undefined
          const marker = new Marker()
            .setLngLat([coord.lng, coord.lat])
            .addTo(this.map);
          this.markers.push(marker); // Agrega el marcador al array
        }
      });
    } else {
      console.error('mapElement is undefined.');
    }
  }

  ngOnDestroy() {
    // Elimina el mapa y los marcadores cuando el componente se destruye para evitar fugas de memoria
    this.map?.remove();
    this.markers.forEach(marker => {
      marker.remove();
    });
  }

  /* lógica para cerrar el popup */
  close(){
    this.dialogRef.close();
  }
}
