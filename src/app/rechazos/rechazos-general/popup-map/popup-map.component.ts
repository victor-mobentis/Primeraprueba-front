import { Component, Inject, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserData } from '../rechazos-general.component'; // Ajusta la ruta según tu estructura de carpetas
import { GoogleMap } from '@angular/google-maps';

@Component({
  selector: 'app-popup-map',
  templateUrl: './popup-map.component.html',
  styleUrls: ['./popup-map.component.css']
})
export class PopupMapComponent implements OnInit, AfterViewInit {
  @ViewChild(GoogleMap) map!: GoogleMap;
  
  center: google.maps.LatLngLiteral = { lat: 40.4168, lng: -3.7038 }; // Coordenadas de Madrid
  zoom = 5; // Nivel de Zoom
  options: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    scrollwheel: true,
  };
  markers: google.maps.Marker[] = [];
  infoWindow: google.maps.InfoWindow | null = null;

  constructor(
    public dialogRef: MatDialogRef<PopupMapComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { selectedRows: UserData[] }
  ) {}

  ngOnInit(): void {
    if (this.data.selectedRows.length > 0) {
      this.center = { 
        lat: this.data.selectedRows[0].latitud, 
        lng: this.data.selectedRows[0].longitud 
      };
    }
  }

  ngAfterViewInit(): void {
    this.addMarkers();
    this.fitBoundsToMarkers();
  }

  addMarkers() {
    this.markers = this.data.selectedRows.map(row => {
      const markerColor = this.getMarkerColor(row.estado);
      const marker = new google.maps.Marker({
        position: { lat: row.latitud, lng: row.longitud },
        title: row.cliente,
        map: this.map?.googleMap,
        icon: {
          url: `http://maps.google.com/mapfiles/ms/icons/${markerColor}-dot.png`
        }
      });

      const infoContent = `
        <div>
          <h3>${row.cliente}</h3>
          <p><strong>Producto:</strong> ${row.producto}</p>
          <p><strong>Estado:</strong> ${row.estado}</p>
          <p><strong>Población:</strong> ${row.poblacion}</p>
          <p><strong>Provincia:</strong> ${row.provincia}</p>
        </div>
      `;

      const infoWindow = new google.maps.InfoWindow({
        content: infoContent
      });

      marker.addListener('click', () => {
        if (this.infoWindow) {
          this.infoWindow.close();
        }
        this.infoWindow = infoWindow;
        infoWindow.open(this.map?.googleMap, marker);
      });

      return marker;
    });
  }

  getMarkerColor(estado: string): string {
    switch (estado) {
      case 'Rechazado':
        return 'red';
      case 'En Proceso':
        return 'blue';
      case 'Vendido':
        return 'green';
      case 'No aplica':
        return 'gray';
      default:
        return 'yellow';
    }
  }

  fitBoundsToMarkers() {
    if (this.map?.googleMap) {
      const bounds = new google.maps.LatLngBounds();
      this.markers.forEach(marker => bounds.extend(marker.getPosition() as google.maps.LatLng));
      this.map.googleMap.fitBounds(bounds);
    }
  }

  close() {
    this.dialogRef.close();
  }
}
