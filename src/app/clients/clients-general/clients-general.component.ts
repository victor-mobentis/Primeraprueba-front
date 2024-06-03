import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { PopupClientDetailComponent } from './popup-client-detail/popup-client-detail.component';
import { PopupMapClientsComponent } from './popup-map-clients/popup-map-clients.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';

export interface UserData {
  codigo: string;
  nombre: string;
  poblacion: string;
  provincia: string;
  cp: string;
  latitud: number;
  longitud: number;
}

const NOMBRE: string[] = [
  'Juan', 'María', 'José', 'Ana', 'Carlos', 'Laura', 'David', 'Sara', 'Daniel', 'Paula',
  'Pablo', 'Elena', 'Pedro', 'Lucía', 'Miguel', 'Carmen', 'Manuel', 'Raquel', 'Javier', 'Nerea',
  'Alejandro', 'Isabel', 'Jorge', 'Sandra', 'Rubén', 'Natalia', 'Sergio', 'Marta', 'Alberto', 'Patricia',
  'Diego', 'Lorena', 'Rafael', 'Beatriz', 'Fernando', 'Miriam', 'Ignacio', 'Eva', 'Adrián', 'Cristina',
  'Francisco', 'Teresa', 'Álvaro', 'Luisa', 'Rocío', 'Mario', 'Verónica', 'Gonzalo', 'Silvia', 'Víctor'
];

const PROVINCIAS: string[] = [
  'Álava', 'Albacete', 'Alicante', 'Almería', 'Asturias', 'Ávila', 'Badajoz', 'Barcelona', 'Burgos', 'Cáceres',
  'Cádiz', 'Cantabria', 'Castellón', 'Ciudad Real', 'Córdoba', 'La Coruña', 'Cuenca', 'Gerona', 'Granada', 'Guadalajara',
  'Guipúzcoa', 'Huelva', 'Huesca', 'Islas Baleares', 'Jaén', 'León', 'Lérida', 'Lugo', 'Madrid', 'Málaga',
  'Murcia', 'Navarra', 'Orense', 'Palencia', 'Las Palmas', 'Pontevedra', 'La Rioja', 'Salamanca', 'Segovia', 'Sevilla', 'Soria',
  'Tarragona', 'Santa Cruz de Tenerife', 'Teruel', 'Toledo', 'Valencia', 'Valladolid', 'Vizcaya', 'Zamora', 'Zaragoza'
];

const POBLACIONES: string[] = [
  'Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Zaragoza', 'Málaga', 'Murcia', 'Palma', 'Las Palmas de Gran Canaria', 'Bilbao',
  'Alicante', 'Córdoba', 'Valladolid', 'Vigo', 'Gijón', 'Hospitalet de Llobregat', 'Vitoria-Gasteiz', 'La Coruña', 'Granada', 'Elche',
  'Oviedo', 'Santa Cruz de Tenerife', 'Pamplona', 'Cartagena', 'Sabadell', 'Jerez de la Frontera', 'Móstoles', 'Santander', 'Alcalá de Henares', 'Fuenlabrada',
  'Legánes', 'San Sebastián', 'Getafe', 'Burgos', 'Albacete', 'Alcorcón', 'Almería', 'Donostia-San Sebastián', 'Castellón de la Plana', 'Logroño', 'Badajoz',
  'La Laguna', 'Salamanca', 'Huelva', 'Marbella', 'Lérida', 'Tarragona', 'Dos Hermanas', 'Torrejón de Ardoz', 'Parla', 'Mataró'
];

const POSTAL_CODES: string[] = [
  '08001', '08002', '08003', '08004', '08005', '08006', '08007', '08008', '08009', '08010',
  '08011', '08012', '08013', '08014', '08015', '08016', '08017', '08018', '08019', '08020',
  '08021', '08022', '08023', '08024', '08025', '08026', '08027', '08028', '08029', '08030'
];

@Component({
  selector: 'app-clients-general',
  templateUrl: './clients-general.component.html',
  styleUrls: ['./clients-general.component.css']
})
export class ClientsGeneralComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['select', 'codigo', 'nombre', 'provincia', 'poblacion', 'cp', 'detalles'];
  dataSource: MatTableDataSource<UserData>;
  selection = new SelectionModel<UserData>(true, []);
  form: FormGroup;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(public dialog: MatDialog, private formBuilder: FormBuilder) {
    const users = Array.from({ length: 100 }, (_, k) => createNewUser(k + 1));
    this.dataSource = new MatTableDataSource(users);
    this.form = this.formBuilder.group({
      NombreFilterControl: [''],
      PoblacionFilterControl: [''],
      ProvinciaFilterControl: [''],
      CpFilterControl: ['']
    });

    this.form.valueChanges.subscribe(() => {
      this.applyFilter();
    });
  }

  ngOnInit() {
    this.loadGoogleMapsScript();
  }

  private loadGoogleMapsScript() {
    if (!document.getElementById('google-maps-script')) {
      const script = document.createElement('script');
      script.id = 'google-maps-script';
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBcREBnuBayqza1v1W2JbUGJqB0W77mcjI`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
  }

  ngAfterViewInit() {
    if (this.dataSource && this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  applyFilter() {
    const filterValues = this.form.value;
    this.dataSource.filterPredicate = (data: UserData, filter: string): boolean => {
      const searchTerms = JSON.parse(filter);
      return (!searchTerms.NombreFilterControl || data.nombre.toLowerCase().indexOf(searchTerms.NombreFilterControl.toLowerCase()) !== -1) &&
             (!searchTerms.PoblacionFilterControl || data.poblacion.toLowerCase().indexOf(searchTerms.PoblacionFilterControl.toLowerCase()) !== -1) &&
             (!searchTerms.ProvinciaFilterControl || data.provincia.toLowerCase().indexOf(searchTerms.ProvinciaFilterControl.toLowerCase()) !== -1) &&
             (!searchTerms.CpFilterControl || data.cp.toLowerCase().indexOf(searchTerms.CpFilterControl.toLowerCase()) !== -1);
    };
    this.dataSource.filter = JSON.stringify(filterValues);
  }

  filtroReset() {
    this.form.reset();
    this.dataSource.filter = '';
  }

  openDetailsDialog(user: UserData) {
    const dialogRef = this.dialog.open(PopupClientDetailComponent, {
      width: '550px',
      height: 'auto',
      disableClose: true,
      data: user
    });
  }

  verEnMapa() {
    if (this.selection.selected.length === 0) {
      // Mostrar un mensaje si no hay datos para mostrar en el mapa
      return;
    }

    const dialogRef = this.dialog.open(PopupMapClientsComponent, {
      width: '80%',
      height: '80%',
      disableClose: true,
      data: { selectedRows: this.selection.selected }
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
}

function createNewUser(codigo: number): UserData {
  const poblacion = POBLACIONES[Math.floor(Math.random() * POBLACIONES.length)];
  const provincia = PROVINCIAS[Math.floor(Math.random() * PROVINCIAS.length)];
  const cp = POSTAL_CODES[Math.floor(Math.random() * POSTAL_CODES.length)];
  const nombre = NOMBRE[Math.floor(Math.random() * NOMBRE.length)];

  // Definición del área de Barcelona
  const barcelonaArea = {
    latMin: 41.320, // Límite sur de Barcelona
    latMax: 41.480, // Límite norte de Barcelona
    lonMin: 2.069,  // Límite oeste de Barcelona
    lonMax: 2.228   // Límite este de Barcelona
  };

  // Función para generar coordenadas aleatorias dentro del área de Barcelona
  function getRandomCoordinatesInBarcelona() {
    const latitud = Math.random() * (barcelonaArea.latMax - barcelonaArea.latMin) + barcelonaArea.latMin;
    const longitud = Math.random() * (barcelonaArea.lonMax - barcelonaArea.lonMin) + barcelonaArea.lonMin;
    return { latitud, longitud };
  }

  const { latitud, longitud } = getRandomCoordinatesInBarcelona();

  return {
    codigo: codigo.toString(),
    nombre: nombre,
    poblacion: poblacion,
    provincia: provincia,
    cp: cp,
    latitud: latitud,
    longitud: longitud,
  };
}
