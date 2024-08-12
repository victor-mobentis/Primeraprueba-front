import { Component, AfterViewInit, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarConfig } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { IClient } from 'src/app/models/clients.model';
import { PopupClientDetailComponent } from './popup-client-detail/popup-client-detail.component';
import { PopupMapClientsComponent } from './popup-map-clients/popup-map-clients.component';
import { ClientsService } from 'src/app/services/clients/clients.service';

@Component({
  selector: 'app-clients-general',
  templateUrl: './clients-general.component.html',
  styleUrls: ['./clients-general.component.css']
})
export class ClientsGeneralComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = [
    'select', 'codigo', 'cliente', 'provincia', 'poblacion', 'cp', 'detalles'
  ];
  dataSource: { data: IClient[] } = { data: [] };
  clientsList: IClient[] = [];
  selection = new SelectionModel<IClient>(true, []);
  form: FormGroup;
  drawerOpen = false;  // Controla el estado del drawer (menú derecho)

  paginator = {
    pageIndex: 0,
    pageSize: 10,
    length: 0,

    firstPage: () => {
      this.paginator.pageIndex = 0;
      this.paginator.updateDataSource();
    },

    previousPage: () => {
      if (this.paginator.pageIndex > 0) {
        this.paginator.pageIndex--;
        this.paginator.updateDataSource();
      }
    },

    nextPage: () => {
      if (this.paginator.pageIndex < this.getTotalPages() - 1) {
        this.paginator.pageIndex++;
        this.paginator.updateDataSource();
      }
    },

    lastPage: () => {
      this.paginator.pageIndex = this.getTotalPages() - 1;
      this.paginator.updateDataSource();
    },

    hasNextPage: () => {
      return this.paginator.pageIndex < this.getTotalPages() - 1;
    },

    updateDataSource: () => {
      const start = this.paginator.pageIndex * this.paginator.pageSize;
      const end = start + this.paginator.pageSize;
      this.dataSource.data = this.clientsList.slice(start, end);
    }
  };

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar, 
    private clientsService: ClientsService
  ) {
    this.dataSource = { data: [] };
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

  ngAfterViewInit() {
    this.paginator.updateDataSource();
  }

  loadClients() {
    this.clientsService.getClients().subscribe((clients: IClient[]) => {
      this.clientsList = clients;
      this.paginator.length = clients.length;
      this.paginator.updateDataSource();
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

  applyFilter() {
    const filterValues = this.form.value;
    this.dataSource.data = this.clientsList.filter(client => {
      return (!filterValues.ClienteFilterControl || client.nombre_empresa.toLowerCase().includes(filterValues.ClienteFilterControl.toLowerCase())) &&
             (!filterValues.PoblacionFilterControl || client.nombre_poblacion.toLowerCase().includes(filterValues.PoblacionFilterControl.toLowerCase())) &&
             (!filterValues.ProvinciaFilterControl || client.nombre_provincia.toLowerCase().includes(filterValues.ProvinciaFilterControl.toLowerCase())) &&
             (!filterValues.CpFilterControl || client.CP.toString().includes(filterValues.CpFilterControl));
    });
    this.paginator.length = this.dataSource.data.length;
    this.paginator.updateDataSource();
  }

  filtroReset() {
    this.form.reset();
    this.dataSource.data = this.clientsList;
    this.paginator.length = this.dataSource.data.length;
    this.paginator.updateDataSource();
  }

  openDetailsDialog(client: IClient) {
    this.dialog.open(PopupClientDetailComponent, {
      width: '550px',
      height: 'auto',
      disableClose: true,
      data: client
    });
  }

  verEnMapa() {
    if (this.selection.selected.length === 0) {
      const config = new MatSnackBarConfig();
      config.duration = 3000;
      config.verticalPosition = 'top';
      this.snackBar.open('Debe seleccionar al menos 1 rechazo antes de ver en el mapa.', '', config);
      return;
    }

    this.dialog.open(PopupMapClientsComponent, {
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

  sort = {
    active: '',
    direction: '',

    setSort: (column: string) => {
      this.sort.direction = this.sort.active === column && this.sort.direction === 'asc' ? 'desc' : 'asc';
      this.sort.active = column;
      this.sortData();
    }
  };

  sortData() {
    const isAsc = this.sort.direction === 'asc';
    this.dataSource.data = this.dataSource.data.sort((a, b) => {
      switch (this.sort.active) {
        case 'codigo': return compare(a.id, b.id, isAsc);
        case 'cliente': return compare(a.nombre_empresa, b.nombre_empresa, isAsc);
        case 'poblacion': return compare(a.nombre_poblacion, b.nombre_poblacion, isAsc);
        case 'provincia': return compare(a.nombre_provincia, b.nombre_provincia, isAsc);
        case 'cp': return compare(a.CP, b.CP, isAsc);
        default: return 0;
      }
    });
    this.paginator.updateDataSource();
  }

  getTotalPages(): number {
    return Math.ceil(this.paginator.length / this.paginator.pageSize);
  }

  toggleDrawer() {
    this.drawerOpen = !this.drawerOpen;  // Alternar el estado del drawer
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
