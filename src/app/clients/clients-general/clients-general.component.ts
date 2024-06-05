import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { IClient } from 'src/app/models/clients.model';
import { IPoblacion } from 'src/app/models/poblaciones.model';
import { IProvincia } from 'src/app/models/provincias.model';
import { PopupClientDetailComponent } from './popup-client-detail/popup-client-detail.component';
import { PopupMapClientsComponent } from './popup-map-clients/popup-map-clients.component';
import { ClientsService } from 'src/app/services/clients/clients.service';
import { FilterService } from 'src/app/services/filter/filter.service';

@Component({
  selector: 'app-clients-general',
  templateUrl: './clients-general.component.html',
  styleUrls: ['./clients-general.component.css']
})
export class ClientsGeneralComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = [
    'select', 'codigo', 'cliente', 'provincia', 'poblacion', 'cp', 'detalles'
  ];
  dataSource: MatTableDataSource<IClient>;
  clientsList: IClient[] = [];
  poblaciones: IPoblacion[] = [];
  provincias: IProvincia[] = [];
  selection = new SelectionModel<IClient>(true, []);
  form: FormGroup;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(
    public dialog: MatDialog, 
    private formBuilder: FormBuilder, 
    private clientsService: ClientsService,

  ) {
    this.dataSource = new MatTableDataSource<IClient>([]);
    this.form = this.formBuilder.group({
      ClienteFilterControl: [''],
      PoblacionFilterControl: [''],
      ProvinciaFilterControl: [''],
      CpFilterControl: ['']
    });

    this.form.valueChanges.subscribe(() => {
      this.applyFilter();
    });
  }

  ngOnInit() {
    this.loadClients();
    this.loadGoogleMapsScript();
  }

  loadClients() {
    this.clientsService.getClients().subscribe((clients: IClient[]) => {
      this.clientsList = clients;
      this.dataSource.data = clients;
      console.log('Clientes cargados:', this.clientsList);
    });
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
    this.dataSource.filterPredicate = (data: IClient, filter: string): boolean => {
      const searchTerms = JSON.parse(filter);
      return (!searchTerms.ClienteFilterControl || data.nombre_empresa.toLowerCase().indexOf(searchTerms.ClienteFilterControl.toLowerCase()) !== -1) &&
             (!searchTerms.PoblacionFilterControl || data.nombre_poblacion.toLowerCase().indexOf(searchTerms.PoblacionFilterControl.toLowerCase()) !== -1) &&
             (!searchTerms.ProvinciaFilterControl || data.nombre_provincia.toLowerCase().indexOf(searchTerms.ProvinciaFilterControl.toLowerCase()) !== -1) &&
             (!searchTerms.CpFilterControl || data.CP.toString().toLowerCase().indexOf(searchTerms.CpFilterControl.toLowerCase()) !== -1);
    };
    this.dataSource.filter = JSON.stringify(filterValues);
  }

  filtroReset() {
    this.form.reset();
    this.dataSource.filter = '';
  }

  openDetailsDialog(client: IClient) {
    const dialogRef = this.dialog.open(PopupClientDetailComponent, {
      width: '550px',
      height: 'auto',
      disableClose: true,
      data: client
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
