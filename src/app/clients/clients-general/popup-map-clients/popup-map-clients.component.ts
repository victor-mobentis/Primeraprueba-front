import { Component, Inject, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GoogleMap } from '@angular/google-maps';
import { UserData } from '../clients-general.component';

@Component({
  selector: 'app-popup-map-clients',
  templateUrl: './popup-map-clients.component.html',
  styleUrls: ['./popup-map-clients.component.css']
})
export class PopupMapClientsComponent implements OnInit, AfterViewInit {
  @ViewChild(GoogleMap) map!: GoogleMap;

  center: google.maps.LatLngLiteral = { lat: 41.3851, lng: 2.1734 }; // Coordenadas de Barcelona, España
  zoom = 12; // Nivel de Zoom predefinido
  options: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    scrollwheel: true,
  };
  markers: google.maps.Marker[] = [];
  infoWindow: google.maps.InfoWindow | null = null;

  constructor(
    public dialogRef: MatDialogRef<PopupMapClientsComponent>,
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
      const marker = new google.maps.Marker({
        position: { lat: row.latitud, lng: row.longitud },
        title: row.cliente,
        map: this.map?.googleMap,
      });

      const infoContent = `
        <div>
          <h2>${row.cliente}</h2>
          <p>${row.poblacion}, ${row.provincia}</p>
          <p>${row.cp}</p>
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

  fitBoundsToMarkers() {
    if (this.map?.googleMap) {
      const bounds = new google.maps.LatLngBounds();
      this.markers.forEach(marker => bounds.extend(marker.getPosition() as google.maps.LatLng));

      if (this.markers.length === 1) {
        this.map.googleMap.setCenter(bounds.getCenter());
        this.map.googleMap.setZoom(15);
      } else {
        this.map.googleMap.fitBounds(bounds);
      }
    }
  }

  close() {
    this.dialogRef.close();
  }
}
